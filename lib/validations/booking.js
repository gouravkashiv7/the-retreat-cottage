import { z } from "zod";

export const bookingSchema = z.object({
  numGuests: z.number().min(1, "Please select at least one guest"),
  observations: z
    .string()
    .max(500, "Observations should be under 500 characters")
    .optional(),
  retreatId: z.string(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
});
