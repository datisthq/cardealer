import { z } from "zod"
import { FacilityType } from "./enums.ts"

export const Facility = z.object({
  id: z.string(),
  type: FacilityType,
  title: z.string(),
  country: z.string(),
  region: z.string(),
  city: z.string(),
  address: z.string(),
  postcode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  url: z.string().optional(),
  lon: z.number().optional(),
  lat: z.number().optional(),
})

export type Facility = z.infer<typeof Facility>
