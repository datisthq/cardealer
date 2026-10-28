from typing import Literal

import fairspec_metadata
from pydantic import Field

from .resource import CardealerResource


class Dataset(fairspec_metadata.Dataset):
    profile: Literal[
        "https://datisthq.github.io/cardealer/profiles/0.4.0/dataset.json"  # x-release-please-version
    ] = Field(alias="$schema")
    resources: list[CardealerResource] = Field(min_length=1)
