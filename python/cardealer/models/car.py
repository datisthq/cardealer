# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, confloat, conint


class Fuel(Enum):
    diesel = 'diesel'
    petrol = 'petrol'
    hybrid = 'hybrid'
    electric = 'electric'


class Gearbox(Enum):
    manual = 'manual'
    auto = 'auto'


class Category(Enum):
    small = 'small'
    estate = 'estate'
    saloon = 'saloon'
    suv = 'suv'
    van = 'van'
    sport = 'sport'
    cabrio = 'cabrio'


class Color(Enum):
    grey = 'grey'
    black = 'black'
    white = 'white'
    blue = 'blue'
    red = 'red'
    green = 'green'
    yellow = 'yellow'
    orange = 'orange'


class Door(Enum):
    twothree = 'twothree'
    fourfive = 'fourfive'
    sixseven = 'sixseven'


class Car(BaseModel):
    showroomId: Optional[str] = Field(None, examples=['showroom-downtown-123'])
    """
    Unique identifier for the showroom where the car is located. If not provided the car is considered located at the dealers's main address
    """
    title: str = Field(..., examples=['2023 Tesla Model 3 Long Range'])
    """
    The title or name of the car listing
    """
    url: str = Field(..., examples=['https://example.com/cars/tesla-model-3-2025'])
    """
    URL to the car listing
    """
    price: confloat(ge=0.0) = Field(..., examples=[45990])
    """
    The price of the car in the currency specified
    """
    currency: str = Field(..., examples=['EUR'])
    """
    Currency of the price
    """
    year: Optional[conint(ge=1900)] = Field(None, examples=[2023])
    """
    Year of first registration (1900-2100)
    """
    mileage: confloat(ge=0.0) = Field(..., examples=[15000])
    """
    Odometer reading in kilometers
    """
    brand: str = Field(..., examples=['Tesla'])
    """
    Car brand/manufacturer
    """
    model: str = Field(..., examples=['Model 3'])
    """
    Car model name
    """
    version: str = Field(..., examples=['Long Range AWD'])
    """
    Specific version or trim level
    """
    fuel: Fuel = Field(..., examples=['electric'])
    """
    Fuel type
    """
    gearbox: Gearbox = Field(..., examples=['auto'])
    """
    Transmission type
    """
    category: Category = Field(..., examples=['suv'])
    """
    Vehicle category/body type
    """
    color: Color = Field(..., examples=['white'])
    """
    Exterior color
    """
    door: Door = Field(..., examples=['fourfive'])
    """
    Number of doors identifier
    """
    power: Optional[int] = Field(None, examples=[283])
    """
    Engine power in horsepower
    """
    cubics: Optional[int] = Field(None, examples=[1998])
    """
    Engine displacement in cubic centimeters
    """
    seats: Optional[int] = Field(None, examples=[5])
    """
    Number of seats
    """
    owners: Optional[int] = Field(None, examples=[1])
    """
    Number of previous owners
    """
    month: Optional[conint(ge=1, le=12)] = Field(None, examples=[6])
    """
    Month of first registration (1-12)
    """
    warranty: Optional[int] = Field(None, examples=[24])
    """
    Warranty duration in months
    """
    range: Optional[int] = Field(None, examples=[580])
    """
    Electric vehicle range in kilometers
    """
    battery: Optional[int] = Field(None, examples=[75])
    """
    Battery capacity in kWh for electric vehicles
    """
    plate: Optional[str] = Field(None, examples=['AB-12-CD'])
    """
    License plate number
    """
    vin: Optional[str] = Field(None, examples=['5YJ3E1EA4KF123456'])
    """
    Vehicle Identification Number
    """
