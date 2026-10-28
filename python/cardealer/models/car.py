from pydantic import Field

from .enums import Category, Color, Door, Fuel, Gearbox
from .integer import Integer
from .row import CardealerRow


class Car(CardealerRow):
    facility_id: str | None = Field(default=None, alias="facilityId")
    title: str
    url: str
    price: float = Field(ge=0)
    currency: str
    year: Integer | None = Field(default=None, ge=1900)
    mileage: float = Field(ge=0)
    brand: str
    model: str
    version: str
    fuel: Fuel
    gearbox: Gearbox
    category: Category
    color: Color
    door: Door
    power: Integer | None = None
    cubics: Integer | None = None
    seats: Integer | None = None
    owners: Integer | None = None
    month: Integer | None = Field(default=None, ge=1, le=12)
    warranty: Integer | None = None
    range: Integer | None = None
    battery: Integer | None = None
    plate: str | None = None
    vin: str | None = None
