---
title: TypeScript
path: /software/typescript/
icon: code-xml
order: 1
---

## Installation

```bash
npm install cardealer @fairspec/metadata
```

## Publication

```typescript
import { writeFile } from "node:fs/promises"
import { Dataset, VERSION } from "cardealer"

const dataset = Dataset.parse({
  $schema: `https://datisthq.github.io/cardealer/profiles/${VERSION}/dataset.json`,
  resources: [
    {
      name: "dealer",
      tableSchema: `https://datisthq.github.io/cardealer/schemas/${VERSION}/dealer.json`,
      data: [
        {
          title: "Premium Auto Sales",
          country: "United States",
          region: "California",
          city: "Los Angeles",
          address: "1234 Sunset Boulevard",
          postcode: "90028",
          phone: "+1-323-555-0100",
          email: "sales@premiumauto.com",
          url: "https://www.premiumauto.com",
          lat: 34.0983,
          lon: -118.3267,
        },
      ],
    },
    {
      name: "facility",
      tableSchema: `https://datisthq.github.io/cardealer/schemas/${VERSION}/facility.json`,
      data: [
        {
          id: "showroom-la",
          type: "showroom",
          title: "Sunset Showroom",
          country: "United States",
          region: "California",
          city: "Los Angeles",
          address: "1234 Sunset Boulevard",
        },
      ],
    },
  ],
})

await writeFile("dataset.json", JSON.stringify(dataset, null, 2))
```

## Validation and consumption

```typescript
import { readFile } from "node:fs/promises"
import { Dataset } from "cardealer"

const result = Dataset.safeParse(JSON.parse(await readFile("dataset.json", "utf8")))
console.log(result.success)
```

## Rows

Every row model is a zod schema, so a single row validates on its own, for example while
reading a feed before the dataset is assembled:

```typescript
import { Car } from "cardealer"

const result = Car.safeParse({
  title: "BMW 3 Series 320d",
  url: "https://www.premiumauto.com/cars/bmw-320d",
  price: 32500,
  currency: "USD",
  mileage: 41000,
  brand: "BMW",
  model: "3 Series",
  version: "320d",
  fuel: "diesel",
  gearbox: "auto",
  category: "saloon",
  color: "black",
  door: "fourfive",
})
console.log(result.success)
```

## Errors

`parse` throws a `ZodError`; `safeParse` returns it in `result.error`. Each issue carries the
`path` to the offending value, and `z.prettifyError` turns them into readable lines:

```typescript
import { z } from "zod"
import { Dataset } from "cardealer"

const result = Dataset.safeParse({ resources: [] })
if (!result.success) {
  console.error(z.prettifyError(result.error))
}
```

## Types

Each schema has a type of the same name, inferred with `z.infer`, and every enumeration
lists its values in `.options`:

```typescript
import { Fuel, type Car } from "cardealer"

const fuels = Fuel.options
const label = (car: Car) => `${car.brand} ${car.model} (${car.fuel})`
```

Unknown keys are dropped by `parse`, so write the parsed value to keep a dataset clean.
