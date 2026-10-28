import { z } from "zod"
import { Category, Color, Door, Fuel, Gearbox } from "./enums.ts"

export const Car = z.object({
  facilityId: z.string().optional(),
  title: z.string(),
  url: z.string(),
  price: z.number().min(0),
  currency: z.string(),
  year: z.number().int().min(1900).optional(),
  mileage: z.number().min(0),
  brand: z.string(),
  model: z.string(),
  version: z.string(),
  fuel: Fuel,
  gearbox: Gearbox,
  category: Category,
  color: Color,
  door: Door,
  power: z.number().int().optional(),
  cubics: z.number().int().optional(),
  seats: z.number().int().optional(),
  owners: z.number().int().optional(),
  month: z.number().int().min(1).max(12).optional(),
  warranty: z.number().int().optional(),
  range: z.number().int().optional(),
  battery: z.number().int().optional(),
  plate: z.string().optional(),
  vin: z.string().optional(),
})

export type Car = z.infer<typeof Car>
