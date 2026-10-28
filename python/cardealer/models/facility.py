from .enums import FacilityType
from .row import CardealerRow


class Facility(CardealerRow):
    id: str
    type: FacilityType
    title: str
    country: str
    region: str
    city: str
    address: str
    postcode: str | None = None
    phone: str | None = None
    email: str | None = None
    url: str | None = None
    lon: float | None = None
    lat: float | None = None
