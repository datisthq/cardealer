use fairspec_metadata::Resource;
use serde::Deserialize;

use super::car::Car;
use super::dealer::Dealer;
use super::facility::Facility;
use crate::error::Error;

const CAR_SCHEMA: &str = "https://datisthq.github.io/cardealer/schemas/0.5.0/car.json"; /* x-release-please-version */
const DEALER_SCHEMA: &str = "https://datisthq.github.io/cardealer/schemas/0.5.0/dealer.json"; /* x-release-please-version */
const FACILITY_SCHEMA: &str = "https://datisthq.github.io/cardealer/schemas/0.5.0/facility.json"; /* x-release-please-version */

#[derive(Debug, Clone, PartialEq)]
pub struct CarResource {
    pub base: Resource,
    pub data: Vec<Car>,
    pub table_schema: String,
}

#[derive(Debug, Clone, PartialEq)]
pub struct DealerResource {
    pub base: Resource,
    pub data: Vec<Dealer>,
    pub table_schema: String,
}

#[derive(Debug, Clone, PartialEq)]
pub struct FacilityResource {
    pub base: Resource,
    pub data: Vec<Facility>,
    pub table_schema: String,
}

#[derive(Debug, Clone, PartialEq)]
pub enum CardealerResource {
    Car(CarResource),
    Dealer(DealerResource),
    Facility(FacilityResource),
}

#[derive(Deserialize)]
#[serde(tag = "name", rename_all = "lowercase")]
pub(crate) enum ResourceView {
    Car {
        data: Vec<Car>,
        #[serde(rename = "tableSchema")]
        table_schema: String,
    },
    Dealer {
        data: Vec<Dealer>,
        #[serde(rename = "tableSchema")]
        table_schema: String,
    },
    Facility {
        data: Vec<Facility>,
        #[serde(rename = "tableSchema")]
        table_schema: String,
    },
}

impl ResourceView {
    pub(crate) fn check(&self) -> Result<(), Error> {
        match self {
            Self::Car { data, table_schema } => {
                check_count("car", data.len(), None)?;
                check_schema("car", table_schema, CAR_SCHEMA)?;
                data.iter().try_for_each(Car::check)
            }
            Self::Dealer { data, table_schema } => {
                check_count("dealer", data.len(), Some(1))?;
                check_schema("dealer", table_schema, DEALER_SCHEMA)
            }
            Self::Facility { data, table_schema } => {
                check_count("facility", data.len(), None)?;
                check_schema("facility", table_schema, FACILITY_SCHEMA)
            }
        }
    }

    pub(crate) fn join(self, mut base: Resource) -> CardealerResource {
        base.data = None;
        base.table_schema = None;
        match self {
            Self::Car { data, table_schema } => CardealerResource::Car(CarResource {
                base,
                data,
                table_schema,
            }),
            Self::Dealer { data, table_schema } => CardealerResource::Dealer(DealerResource {
                base,
                data,
                table_schema,
            }),
            Self::Facility { data, table_schema } => {
                CardealerResource::Facility(FacilityResource {
                    base,
                    data,
                    table_schema,
                })
            }
        }
    }
}

fn check_count(name: &str, count: usize, maximum: Option<usize>) -> Result<(), Error> {
    if count < 1 {
        return Err(Error::Constraint(format!(
            "{name} resource must have at least 1 row"
        )));
    }
    if let Some(maximum) = maximum
        && count > maximum
    {
        return Err(Error::Constraint(format!(
            "{name} resource must have at most {maximum} rows"
        )));
    }
    Ok(())
}

fn check_schema(name: &str, table_schema: &str, expected: &str) -> Result<(), Error> {
    if table_schema != expected {
        return Err(Error::Constraint(format!(
            "{name} resource tableSchema must be {expected}"
        )));
    }
    Ok(())
}
