from typing import Annotated

from pydantic import BeforeValidator


def _accept_integral(value: object) -> object:
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


Integer = Annotated[int, BeforeValidator(_accept_integral)]
