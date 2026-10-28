---
title: Software
path: /overview/software/
icon: laptop
order: 2
---

Fairspec Cardealer provides libraries for TypeScript, Python and Rust. Each one extends the
matching [Fairspec](https://github.com/datisthq/fairspec) base library, so a cardealer dataset
is also a valid Fairspec dataset, and all three pass the same conformance suite.

> [!NOTE]
> The libraries build on Fairspec base libraries that are not released yet, so the packages are
> not published to the registries yet.

## TypeScript

### Installation

```bash
npm install cardealer @fairspec/metadata
```

### Publication

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

### Validation and consumption

```typescript
import { readFile } from "node:fs/promises"
import { Dataset } from "cardealer"

const result = Dataset.safeParse(JSON.parse(await readFile("dataset.json", "utf8")))
console.log(result.success)
```

## Python

### Installation

```bash
pip install cardealer fairspec-metadata
```

### Publication

```python
import json

from cardealer import VERSION, Dataset

dataset = Dataset.model_validate(
    {
        "$schema": f"https://datisthq.github.io/cardealer/profiles/{VERSION}/dataset.json",
        "resources": [
            {
                "name": "dealer",
                "tableSchema": f"https://datisthq.github.io/cardealer/schemas/{VERSION}/dealer.json",
                "data": [
                    {
                        "title": "Premium Auto Sales",
                        "country": "United States",
                        "region": "California",
                        "city": "Los Angeles",
                        "address": "1234 Sunset Boulevard",
                        "postcode": "90028",
                        "phone": "+1-323-555-0100",
                        "email": "sales@premiumauto.com",
                        "url": "https://www.premiumauto.com",
                        "lat": 34.0983,
                        "lon": -118.3267,
                    }
                ],
            },
            {
                "name": "facility",
                "tableSchema": f"https://datisthq.github.io/cardealer/schemas/{VERSION}/facility.json",
                "data": [
                    {
                        "id": "showroom-la",
                        "type": "showroom",
                        "title": "Sunset Showroom",
                        "country": "United States",
                        "region": "California",
                        "city": "Los Angeles",
                        "address": "1234 Sunset Boulevard",
                    }
                ],
            },
        ],
    }
)

with open("dataset.json", "w") as file:
    json.dump(dataset.model_dump(mode="json", by_alias=True, exclude_none=True), file, indent=2)
```

### Validation and consumption

```python
import json

from cardealer import Dataset

with open("dataset.json") as file:
    dataset = Dataset.model_validate(json.load(file))
print(dataset)
```

## Rust

### Installation

Nothing is published to crates.io yet, so depend on the repository:

```toml
[dependencies]
cardealer = { git = "https://github.com/datisthq/cardealer" }
serde_json = "1"
```

### Validation and consumption

The Rust library reads and validates a dataset; it does not write one.

```rust
use cardealer::Dataset;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let value: serde_json::Value = serde_json::from_str(&std::fs::read_to_string("dataset.json")?)?;
    let dataset = Dataset::from_value(value)?;
    println!("{} resources", dataset.resources.len());
    Ok(())
}
```
