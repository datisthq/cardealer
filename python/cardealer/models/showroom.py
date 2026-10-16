# ruff: noqa -- DO NOT UPDATE this @generated file

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class Showroom(BaseModel):
    id: str = Field(..., examples=['showroom-downtown-123'])
    """
    Unique identifier of the showroom
    """
    title: str = Field(..., examples=['Downtown Auto Gallery'])
    """
    The name of the showroom
    """
    country: str = Field(..., examples=['United States'])
    """
    Country where the showroom is located
    """
    region: str = Field(..., examples=['California'])
    """
    State or region within the country
    """
    city: str = Field(..., examples=['Los Angeles'])
    """
    Closest city where the showroom is located
    """
    address: str = Field(..., examples=['123 Main Street'])
    """
    Street address of the showroom
    """
    postcode: Optional[str] = Field(None, examples=['90210'])
    """
    Postal code of the showroom location
    """
    phone: Optional[str] = Field(None, examples=['+1-555-123-4567'])
    """
    Contact phone number for the showroom
    """
    email: Optional[EmailStr] = Field(None, examples=['info@downtownauto.com'])
    """
    Contact email address for the showroom
    """
    url: Optional[str] = Field(None, examples=['https://www.downtownauto.com'])
    """
    URL to the showroom
    """
    lon: Optional[float] = Field(None, examples=[-118.2437])
    """
    Longitude coordinate of the showroom location
    """
    lat: Optional[float] = Field(None, examples=[34.0522])
    """
    Latitude coordinate of the showroom location
    """
