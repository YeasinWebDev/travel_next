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