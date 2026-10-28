import { Dataset as StandardDataset } from "@fairspec/metadata"
import { z } from "zod"
import { VERSION } from "../settings.ts"
import { CardealerResource } from "./resource.ts"

export const Dataset = StandardDataset.extend({
  $schema: z.literal(
    `https://datisthq.github.io/cardealer/profiles/${VERSION}/dataset.json`,
  ),
  resources: z.array(CardealerResource).min(1),
})

export type Dataset = z.infer<typeof Dataset>
