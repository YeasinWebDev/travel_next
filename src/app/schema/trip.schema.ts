import z from "zod";

export const formSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100),
    image: z.instanceof(File, { message: "Image is required" }).nullable(),
    destination: z.string(),
    startDate: z.date("Start date is required"),
    endDate: z.date("End date is required"),
    capacity: z.string().min(1, "Capacity is required"),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type TripFormValues = z.infer<typeof formSchema>;



export const tripEditSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
    image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    destination: z.string().min(1, "Please select a destination"),
    startDate: z.date("Start date is required"),
    endDate: z.date("End date is required"),
    capacity: z.number().int("Capacity must be a whole number").min(1, "Capacity must be at least 1").max(100, "Capacity cannot exceed 100"),
    status: z.enum(["active", "completed", "cancelled"]),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type TripEditValues = z.infer<typeof tripEditSchema>;