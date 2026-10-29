---
title: Rust
path: /software/rust/
icon: cog
order: 3
---

## Installation

```bash
cargo add cardealer serde_json
```

## Validation and consumption

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

## Resources

`Dataset::resources` is a `Vec<CardealerResource>`, an enum with one variant per table; each
resource keeps its Fairspec fields in `base` and its typed rows in `data`:

```rust
use cardealer::{CardealerResource, Dataset};

fn count_cars(dataset: &Dataset) -> usize {
    dataset
        .resources
        .iter()
        .map(|resource| match resource {
            CardealerResource::Car(cars) => cars.data.len(),
            _ => 0,
        })
        .sum()
}
```

## Rows

`Dealer`, `Facility` and `Car` validate on their own with `from_value`, and unlike the
dataset they also implement `Serialize`, so rows can be written back out with `serde_json`:

```rust
use cardealer::Car;
use serde_json::json;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let car = Car::from_value(json!({
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
        "door": "fourfive"
    }))?;
    println!("{}", serde_json::to_string(&car)?);
    Ok(())
}
```

## Errors

`from_value` returns `cardealer::Error`: `Error::Parse` wraps the `serde_json::Error` for a
missing column, a wrong type or an unknown enumeration value, and `Error::Constraint` names a
broken rule such as a negative price or a wrong `$schema`.
