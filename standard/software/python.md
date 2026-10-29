---
title: Python
path: /software/python/
icon: code
order: 2
---

## Installation

```bash
pip install cardealer fairspec-metadata
```

## Publication

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

## Validation and consumption

```python
import json

from cardealer import Dataset

with open("dataset.json") as file:
    dataset = Dataset.model_validate(json.load(file))
print(dataset)
```

## Rows

Every row model is a pydantic model, so a single row validates on its own. Read rows by
their JSON names (`facilityId`); the attributes use snake case (`facility_id`):

```python
from cardealer import Car

car = Car.model_validate(
    {
        "facilityId": "showroom-la",
        "title": "BMW 3 Series 320d",
        "url": "https://www.premiumauto.com/cars/bmw-320d",
        "price": 32500,
        "currency": "USD",
        "mileage": 41000,
        "brand": "BMW",
        "model": "3 Series",
        "version": "320d",
        "fuel": "diesel",
        "gearbox": "auto",
        "category": "saloon",
        "color": "black",
        "door": "fourfive",
    }
)
print(car.facility_id)
```

## Errors

A failed validation raises pydantic's `ValidationError`, which lists every problem with its
location:

```python
from pydantic import ValidationError

from cardealer import Dataset

try:
    Dataset.model_validate({"resources": []})
except ValidationError as error:
    for issue in error.errors():
        print(issue["loc"], issue["msg"])
```

## Types

The enumerations are `Literal` types, so plain strings type-check and `typing.get_args`
lists the values:

```python
from typing import get_args

from cardealer import Fuel

fuels = get_args(Fuel)
```

Dump with `by_alias=True` to get the JSON names back, and `exclude_none=True` so that unset
optional columns are left out rather than written as `null`, which the standard rejects.
Unknown keys are kept.
