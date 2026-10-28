import { Resource } from "@fairspec/metadata"
import { z } from "zod"
import { VERSION } from "../settings.ts"
import { Car } from "./car.ts"
import { Dealer } from "./dealer.ts"
import { Facility } from "./facility.ts"

export const CarResource = Resource.extend({
  name: z.literal("car"),
  data: z.array(Car).min(1),
  tableSchema: z.literal(
    `https://datisthq.github.io/cardealer/schemas/${VERSION}/car.json`,
  ),
})

export const DealerResource = Resource.extend({
  name: z.literal("dealer"),
  data: z.array(Dealer).min(1).max(1),
  tableSchema: z.literal(
    `https://datisthq.github.io/cardealer/schemas/${VERSION}/dealer.json`,
  ),
})

export const FacilityResource = Resource.extend({
  name: z.literal("facility"),
  data: z.array(Facility).min(1),
  tableSchema: z.literal(
    `https://datisthq.github.io/cardealer/schemas/${VERSION}/facility.json`,
  ),
})

export const CardealerResource = z.discriminatedUnion("name", [
  CarResource,
  DealerResource,
  FacilityResource,
])

export type CarResource = z.infer<typeof CarResource>
export type DealerResource = z.infer<typeof DealerResource>
export type FacilityResource = z.infer<typeof FacilityResource>
export type CardealerResource = z.infer<typeof CardealerResource>
