---
title: Metadata
path: /specification/metadata/
order: 1
---

## Definitions

- <a id="%24defs/Dataset"></a>**`Dataset`** _(object)_
  - <a id="%24defs/Dataset/properties/%24schema"></a>**`$schema`**: Must be: `"https://datisthq.github.io/cardealer/profiles/<version>/dataset.json"`.
  - <a id="%24defs/Dataset/properties/resources"></a>**`resources`** _(array, required)_: Length must be at least 1.
    - <a id="%24defs/Dataset/properties/resources/items"></a>**Items**: Refer to _[#/$defs/Resource](#%24defs/Resource)_.
- <a id="%24defs/Resource"></a>**`Resource`**
  - **One of**
    - <a id="%24defs/Resource/oneOf/0"></a>: Refer to _[#/$defs/CarResource](#%24defs/CarResource)_.
    - <a id="%24defs/Resource/oneOf/1"></a>: Refer to _[#/$defs/DealerResource](#%24defs/DealerResource)_.
    - <a id="%24defs/Resource/oneOf/2"></a>: Refer to _[#/$defs/FacilityResource](#%24defs/FacilityResource)_.
- <a id="%24defs/CarResource"></a>**`CarResource`** _(object)_
  - <a id="%24defs/CarResource/properties/name"></a>**`name`**: Must be: `"car"`.
  - <a id="%24defs/CarResource/properties/data"></a>**`data`** _(array, required)_: Data items have to conform to the Car table schema. Length must be at least 1.
    - <a id="%24defs/CarResource/properties/data/items"></a>**Items** _(object)_
  - <a id="%24defs/CarResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/<version>/car.json"`.
- <a id="%24defs/DealerResource"></a>**`DealerResource`** _(object)_
  - <a id="%24defs/DealerResource/properties/name"></a>**`name`**: Must be: `"dealer"`.
  - <a id="%24defs/DealerResource/properties/data"></a>**`data`** _(array, required)_: Data items have to conform to the Dealer table schema. Length must be equal to 1.
    - <a id="%24defs/DealerResource/properties/data/items"></a>**Items** _(object)_
  - <a id="%24defs/DealerResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/<version>/dealer.json"`.
- <a id="%24defs/FacilityResource"></a>**`FacilityResource`** _(object)_
  - <a id="%24defs/FacilityResource/properties/name"></a>**`name`**: Must be: `"facility"`.
  - <a id="%24defs/FacilityResource/properties/data"></a>**`data`** _(array, required)_: Data items have to conform to the Facility table schema. Length must be at least 1.
    - <a id="%24defs/FacilityResource/properties/data/items"></a>**Items** _(object)_
  - <a id="%24defs/FacilityResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/<version>/facility.json"`.
