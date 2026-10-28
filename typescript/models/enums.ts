import { z } from "zod"

export const Fuel = z.enum(["diesel", "petrol", "hybrid", "electric"])
export const Gearbox = z.enum(["manual", "auto"])
export const Category = z.enum([
  "small",
  "estate",
  "saloon",
  "suv",
  "van",
  "sport",
  "cabrio",
])
export const Color = z.enum([
  "grey",
  "black",
  "white",
  "blue",
  "red",
  "green",
  "yellow",
  "orange",
])
export const Door = z.enum(["twothree", "fourfive", "sixseven"])
export const FacilityType = z.enum([
  "showroom",
  "service",
  "warehouse",
  "delivery",
  "office",
])

export type Fuel = z.infer<typeof Fuel>
export type Gearbox = z.infer<typeof Gearbox>
export type Category = z.infer<typeof Category>
export type Color = z.infer<typeof Color>
export type Door = z.infer<typeof Door>
export type FacilityType = z.infer<typeof FacilityType>
