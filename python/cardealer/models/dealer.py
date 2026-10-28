from .row import CardealerRow


class Dealer(CardealerRow):
    title: str
    country: str
    region: str
    city: str
    address: str
    postcode: str | None = None
    phone: str | None = None
    email: str | None = None
    url: str
    lon: float | None = None
    lat: float | None = None
