import { z } from "zod"

export const Dealer = z.object({
  title: z.string(),
  country: z.string(),
  region: z.string(),
  city: z.string(),
  address: z.string(),
  postcode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  url: z.string(),
  lon: z.number().optional(),
  lat: z.number().optional(),
})

export type Dealer = z.infer<typeof Dealer>
