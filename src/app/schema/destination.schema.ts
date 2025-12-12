import z from "zod";

// Form validation schema
export const destinationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  division: z.string().min(1, { message: "Division is required." }),
  bestTimeToVisit: z.string().min(2, { message: "Best time to visit is required." }),
  coordinates: z
    .object({
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional(),
    })
    .optional(),
});

export type DestinationFormValues = z.infer<typeof destinationSchema>;