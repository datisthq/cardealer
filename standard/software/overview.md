---
title: Overview
path: /software/overview/
icon: book-open
order: 0
---

Fairspec Cardealer provides libraries for [TypeScript](../typescript/),
[Python](../python/) and [Rust](../rust/). Each one extends the matching
[Fairspec](https://github.com/datisthq/fairspec) base library, so a cardealer dataset is also a
valid Fairspec dataset, and all three pass the same conformance suite.

## Libraries

| Language   | Package                                                       | Base library                   | Requires     | Reads | Writes    |
| ---------- | ------------------------------------------------------------- | ------------------------------ | ------------ | ----- | --------- |
| TypeScript | [`cardealer`](https://www.npmjs.com/package/cardealer) (npm)  | `@fairspec/metadata` + zod     | ESM runtime  | yes   | yes       |
| Python     | [`cardealer`](https://pypi.org/project/cardealer/) (PyPI)     | `fairspec-metadata` + pydantic | Python 3.12+ | yes   | yes       |
| Rust       | [`cardealer`](https://crates.io/crates/cardealer) (crates.io) | `fairspec-metadata` + serde    | Rust 1.88+   | yes   | rows only |

All three are released together under one version, the same version as the standard.

## What they export

The same names in every language:

- `Dataset` - a whole cardealer dataset: its `$schema` and its `dealer`, `facility` and `car`
  resources
- `DealerResource`, `FacilityResource`, `CarResource` and their union `CardealerResource`
- `Dealer`, `Facility`, `Car` - a single table row
- `Category`, `Color`, `Door`, `FacilityType`, `Fuel`, `Gearbox` - the enumerations
- `VERSION` - the standard version the library implements

## What they check

A library accepts a dataset only when:

- `$schema` is the dataset profile URL of the library's own `VERSION`, and every resource's
  `tableSchema` is the matching table schema URL
- there is at least one resource, a `dealer` resource holds exactly one row, and every other
  resource at least one
- every row has its required columns, enumerated columns hold a listed value, and numbers are
  in range (`price` and `mileage` not negative, `year` from 1900, `month` from 1 to 12)

They are deliberately strict about types: no value is coerced (`"45990"` is not a number),
an integer column accepts `2023` or `2023.0` but not `2023.5`, and an optional column may be
left out but not set to `null`.

Two things are left to a Fairspec validator: `format` (that `email` and `url` look like an
email and a URL) and the rules between rows, such as a car's `facilityId` pointing to an
existing facility `id`. Validate against the published
[profile and schemas](../../specification/) when you need the full check.

## Versions

A library validates datasets of its own version only, so pin it to the standard version your
datasets declare. Build `$schema` and `tableSchema` from `VERSION` rather than writing the
number by hand, and upgrading the library upgrades the URLs with it.
