use serde::{Deserialize, Serialize};
use serde_json::Value;

use super::enums::FacilityType;
use super::present;
use crate::error::Error;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Facility {
    pub id: String,
    pub r#type: FacilityType,
    pub title: String,
    pub country: String,
    pub region: String,
    pub city: String,
    pub address: String,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub postcode: Option<String>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub phone: Option<String>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub email: Option<String>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub url: Option<String>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub lon: Option<f64>,
    #[serde(
        default,
        deserialize_with = "present",
        skip_serializing_if = "Option::is_none"
    )]
    pub lat: Option<f64>,
}

impl Facility {
    pub fn from_value(value: Value) -> Result<Self, Error> {
        Ok(serde_json::from_value(value)?)
    }
}
