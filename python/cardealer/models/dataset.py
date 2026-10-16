# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Any, Literal, Mapping, Sequence, Union

from pydantic import BaseModel, Field, RootModel


class CarResource(BaseModel):
    name: Literal['car']
    data: Sequence[Mapping[str, Any]] = Field(..., min_length=1)
    """
    Data items have to conform to the Car table schema
    """
    tableSchema: Literal[
        'https://datisthq.github.io/cardealer/schemas/0.4.0/car.json'
    ]


class DealerResource(BaseModel):
    name: Literal['dealer']
    data: Sequence[Mapping[str, Any]] = Field(..., max_length=1, min_length=1)
    """
    Data items have to conform to the Dealer table schema
    """
    tableSchema: Literal[
        'https://datisthq.github.io/cardealer/schemas/0.4.0/dealer.json'
    ]


class ShowroomResource(BaseModel):
    name: Literal['showroom']
    data: Sequence[Mapping[str, Any]] = Field(..., min_length=1)
    """
    Data items have to conform to the Showroom table schema
    """
    tableSchema: Literal[
        'https://datisthq.github.io/cardealer/schemas/0.4.0/showroom.json'
    ]


class Resource(RootModel[Union[CarResource, DealerResource, ShowroomResource]]):
    root: Union[CarResource, DealerResource, ShowroomResource]


class Dataset(BaseModel):
    field_schema: Literal[
        'https://datisthq.github.io/cardealer/profiles/0.4.0/dataset.json'
    ] = Field(..., alias='$schema')
    resources: Sequence[Resource] = Field(..., min_length=1)


FairspecCardealerProfile = Dataset
