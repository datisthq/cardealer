use serde::{Deserialize, Serialize};
use serde_json::Value;

use super::enums::{Category, Color, Door, Fuel, Gearbox};
use super::{integer, present};
use crate::error::Error;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Car {
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub facility_id: Option<String>,
    pub title: String,
    pub url: String,
    pub price: f64,
    pub currency: String,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub year: Option<i64>,
    pub mileage: f64,
    pub brand: String,
    pub model: String,
    pub version: String,
    pub fuel: Fuel,
    pub gearbox: Gearbox,
    pub category: Category,
    pub color: Color,
    pub door: Door,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub power: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub cubics: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub seats: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub owners: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub month: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub warranty: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub range: Option<i64>,
    #[serde(
        default,
        deserialize_with = "integer::present",
        skip_serializing_if = "Option::is_none"
    )]
    pub battery: Option<i64>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub plate: Option<String>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub vin: Option<String>,
}

impl Car {
    pub fn from_value(value: Value) -> Result<Self, Error> {
        let car: Self = serde_json::from_value(value)?;
        car.check()?;
        Ok(car)
    }

    pub(crate) fn check(&self) -> Result<(), Error> {
        if self.price < 0.0 {
            return Err(Error::Constraint("price must be at least 0".into()));
        }
        if self.mileage < 0.0 {
            return Err(Error::Constraint("mileage must be at least 0".into()));
        }
        if self.year.is_some_and(|year| year < 1900) {
            return Err(Error::Constraint("year must be at least 1900".into()));
        }
        if self.month.is_some_and(|month| !(1..=12).contains(&month)) {
            return Err(Error::Constraint("month must be between 1 and 12".into()));
        }
        Ok(())
    }
}
