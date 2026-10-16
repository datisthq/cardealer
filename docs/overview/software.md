---
title: Software
path: /overview/software/
icon: laptop
order: 2
---

Fairspec Cardealer provides SDKs for Python and TypeScript/JavaScript to make it easy to publish and consume datasets.

## Python

> [!NOTE]
> In addition to the Python SDK, we recommend using [Fairspec Python](https://github.com/datisthq/fairspec-python) to manage your datasets. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
pip install fairspec fairspec-extension
```

### Publication

```python
from fairspec_extension import Dataset, Dealer, Car
from fairspec import saveDatasetDescriptor

# Create dealer information
dealer = Dealer(
    title="Premium Auto Sales",
    country="United States",
    region="California",
    city="Los Angeles",
    address="1234 Sunset Boulevard",
    postcode="90028",
    phone="+1-323-555-0100",
    email="sales@premiumauto.com",
    url="https://www.premiumauto.com",
    lat=34.0983,
    lon=-118.3267,
)

# Create car listings
car = Car(
    title="2023 Tesla Model 3 Long Range",
    url="https://www.premiumauto.com/cars/tesla-model-3-2023",
    price=45990,
    currency="USD",
    year=2023,
    mileage=12000,
    brand="Tesla",
    model="Model 3",
    version="Long Range AWD",
    fuel="electric",
    gearbox="auto",
    category="saloon",
    color="white",
    door="fourfive",
    power=346,
    seats=5,
    range=358,
    battery=75,
)

dataset = Dataset(
    {
        "$schema": "https://datisthq.github.io/cardealer/profiles/0.2.0/dataset.json",
        "resources": [
            {
                "name": "car",
                "data": [car],
                "schema": "https://datisthq.github.io/cardealer/schemas/0.2.0/car.json",
            },
            {
                "name": "dealer",
                "data": [dealer],
                "schema": "https://datisthq.github.io/cardealer/schemas/0.2.0/dealer.json",
            },
        ],
    }
)

saveDatasetDescriptor(dataset, path="dataset.json")
```

### Validation

```python
from fairspec import validateDataset

report = validateDataset("dataset.json")
print(report)
```

### Consumption

```python
from fairspec import loadDatasetDescriptor

dataset = loadDatasetDescriptor("dataset.json")
print(dataset)
```

## TypeScript

> [!NOTE]
> In addition to the TypeScript SDK, we recommend using [Fairspec TypeScript](https://github.com/datisthq/fairspec-typescript) to manage your datasets. For example, using it you can publish your data package directory to Zenodo instead of saving it locally, as well as consume it from a remote server.

### Installation

```bash
npm install fairspec fairspec-extension
```

### Publication

```typescript
import type { Car, Dealer, Package } from "cardealer"
import { savePackageDescriptor } from "fairspec"

const dealer: Dealer = {
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
}

const car: Car = {
  title: "2023 Tesla Model 3 Long Range",
  url: "https://www.premiumauto.com/cars/tesla-model-3-2023",
  price: 45990,
  currency: "USD",
  year: 2023,
  mileage: 12000,
  brand: "Tesla",
  model: "Model 3",
  version: "Long Range AWD",
  fuel: "electric",
  gearbox: "auto",
  category: "saloon",
  color: "white",
  door: "fourfive",
  power: 346,
  seats: 5,
  range: 358,
  battery: 75,
}

const dataset: Dataset = {
  $schema: "https://datisthq.github.io/cardealer/profiles/0.2.0/dataset.json",
  resources: [
    {
      name: "car",
      data: [car],
      schema: "https://datisthq.github.io/cardealer/schemas/0.2.0/car.json",
    },
    {
      name: "dealer",
      data: [dealer],
      schema: "https://datisthq.github.io/cardealer/schemas/0.2.0/dealer.json",
    },
  ],
}

await saveDatasetDescriptor(dataset, {
  path: "dataset.json",
  overwrite: true,
})
```

### Validation

```typescript
import { validateDataset } from "fairspec"

const { valid, errors } = await validateDataset("dataset.json")
console.log(valid, errors)
```

### Consumption

```typescript
import { loadDatasetDescriptor } from "fairspec"

const dataset = await loadDatasetDescriptor("dataset.json")
console.log(dataset)
```
