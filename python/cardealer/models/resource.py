from typing import Annotated, Literal, Union

import fairspec_metadata
from pydantic import Field

from .car import Car
from .dealer import Dealer
from .facility import Facility


class CarResource(fairspec_metadata.Resource):
    name: Literal["car"]
    data: list[Car] = Field(min_length=1)
    table_schema: Literal[
        "https://datisthq.github.io/cardealer/schemas/0.4.0/car.json"  # x-release-please-version
    ] = Field(alias="tableSchema")


class DealerResource(fairspec_metadata.Resource):
    name: Literal["dealer"]
    data: list[Dealer] = Field(min_length=1, max_length=1)
    table_schema: Literal[
        "https://datisthq.github.io/cardealer/schemas/0.4.0/dealer.json"  # x-release-please-version
    ] = Field(alias="tableSchema")


class FacilityResource(fairspec_metadata.Resource):
    name: Literal["facility"]
    data: list[Facility] = Field(min_length=1)
    table_schema: Literal[
        "https://datisthq.github.io/cardealer/schemas/0.4.0/facility.json"  # x-release-please-version
    ] = Field(alias="tableSchema")


CardealerResource = Annotated[
    Union[CarResource, DealerResource, FacilityResource],
    Field(discriminator="name"),
]
