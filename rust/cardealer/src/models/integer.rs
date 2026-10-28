use std::fmt;

use serde::Deserializer;
use serde::de::{Error, Unexpected, Visitor};

const LIMIT: f64 = 9_007_199_254_740_992.0;

pub(crate) fn deserialize<'de, D: Deserializer<'de>>(deserializer: D) -> Result<i64, D::Error> {
    deserializer.deserialize_any(IntegerVisitor)
}

pub(crate) fn present<'de, D: Deserializer<'de>>(deserializer: D) -> Result<Option<i64>, D::Error> {
    deserialize(deserializer).map(Some)
}

struct IntegerVisitor;

impl Visitor<'_> for IntegerVisitor {
    type Value = i64;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("an integer")
    }

    fn visit_i64<E: Error>(self, value: i64) -> Result<i64, E> {
        Ok(value)
    }

    fn visit_u64<E: Error>(self, value: u64) -> Result<i64, E> {
        i64::try_from(value).map_err(|_| E::invalid_value(Unexpected::Unsigned(value), &self))
    }

    fn visit_f64<E: Error>(self, value: f64) -> Result<i64, E> {
        if value.fract() == 0.0 && value.abs() <= LIMIT {
            Ok(value as i64)
        } else {
            Err(E::invalid_value(Unexpected::Float(value), &self))
        }
    }
}
