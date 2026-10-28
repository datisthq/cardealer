from typing import Any

from fairspec_metadata import FairspecModel
from pydantic import ConfigDict, model_validator


class CardealerRow(FairspecModel):
    model_config = ConfigDict(strict=True, extra="allow", populate_by_name=True)

    @model_validator(mode="before")
    @classmethod
    def _reject_nulls(cls, data: Any) -> Any:
        if isinstance(data, dict):
            for name, field in cls.model_fields.items():
                for key in {name, field.alias}:
                    if key is not None and key in data and data[key] is None:
                        raise ValueError(f"{key} must not be null")
        return data
