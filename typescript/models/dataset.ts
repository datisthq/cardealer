// biome-ignore-all format: DO NOT UPDATE this @generated file
import { z } from "zod";

export const CarResource = z.object({
    name: z.literal("car"),
    data: z.tuple([z.object({})]).rest(z.object({})),
    Table: z.literal("https://datisthq.github.io/cardealer/schemas/0.4.0/car.json")
});

export const DealerResource = z.object({
    name: z.literal("dealer"),
    data: z.tuple([z.object({})]),
    Table: z.literal("https://datisthq.github.io/cardealer/schemas/0.4.0/dealer.json")
});

export const ShowroomResource = z.object({
    name: z.literal("showroom"),
    data: z.tuple([z.object({})]).rest(z.object({})),
    Table: z.literal("https://datisthq.github.io/cardealer/schemas/0.4.0/showroom.json")
});

export const Resource = z.union([CarResource, DealerResource, ShowroomResource]);

export const Dataset = z.object({
    $schema: z.literal("https://datisthq.github.io/cardealer/profiles/0.4.0/dataset.json"),
    resources: z.tuple([Resource]).rest(Resource)
});

export const FairspecCardealerProfile = Dataset;
export type CarResource = z.infer<typeof CarResource>
export type DealerResource = z.infer<typeof DealerResource>
export type ShowroomResource = z.infer<typeof ShowroomResource>
export type Resource = z.infer<typeof Resource>
export type Dataset = z.infer<typeof Dataset>
export type FairspecCardealerProfile = z.infer<typeof FairspecCardealerProfile>
