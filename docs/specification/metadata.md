---
title: Metadata
path: /specification/metadata/
order: 1
---

## Definitions

- <a id="%24defs/Dataset"></a>**`Dataset`** *(object)*
  - <a id="%24defs/Dataset/properties/%24schema"></a>**`$schema`**: Must be: `"https://datisthq.github.io/cardealer/profiles/0.5.0/dataset.json"`.
  - <a id="%24defs/Dataset/properties/resources"></a>**`resources`** *(array, required)*: Length must be at least 1.
    - <a id="%24defs/Dataset/properties/resources/items"></a>**Items**: Refer to *[#/$defs/Resource](#%24defs/Resource)*.
- <a id="%24defs/Resource"></a>**`Resource`**
  - **One of**
    - <a id="%24defs/Resource/oneOf/0"></a>: Refer to *[#/$defs/CarResource](#%24defs/CarResource)*.
    - <a id="%24defs/Resource/oneOf/1"></a>: Refer to *[#/$defs/DealerResource](#%24defs/DealerResource)*.
    - <a id="%24defs/Resource/oneOf/2"></a>: Refer to *[#/$defs/ShowroomResource](#%24defs/ShowroomResource)*.
- <a id="%24defs/CarResource"></a>**`CarResource`** *(object)*
  - <a id="%24defs/CarResource/properties/name"></a>**`name`**: Must be: `"car"`.
  - <a id="%24defs/CarResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Car table schema. Length must be at least 1.
    - <a id="%24defs/CarResource/properties/data/items"></a>**Items** *(object)*
  - <a id="%24defs/CarResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/0.5.0/car.json"`.
- <a id="%24defs/DealerResource"></a>**`DealerResource`** *(object)*
  - <a id="%24defs/DealerResource/properties/name"></a>**`name`**: Must be: `"dealer"`.
  - <a id="%24defs/DealerResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Dealer table schema. Length must be equal to 1.
    - <a id="%24defs/DealerResource/properties/data/items"></a>**Items** *(object)*
  - <a id="%24defs/DealerResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/0.5.0/dealer.json"`.
- <a id="%24defs/ShowroomResource"></a>**`ShowroomResource`** *(object)*
  - <a id="%24defs/ShowroomResource/properties/name"></a>**`name`**: Must be: `"showroom"`.
  - <a id="%24defs/ShowroomResource/properties/data"></a>**`data`** *(array, required)*: Data items have to conform to the Showroom table schema. Length must be at least 1.
    - <a id="%24defs/ShowroomResource/properties/data/items"></a>**Items** *(object)*
  - <a id="%24defs/ShowroomResource/properties/tableSchema"></a>**`tableSchema`**: Must be: `"https://datisthq.github.io/cardealer/schemas/0.5.0/showroom.json"`.
