pub mod car;
pub mod dataset;
pub mod dealer;
pub mod enums;
pub mod facility;
pub mod integer;
pub mod resource;

use serde::{Deserialize, Deserializer};

pub(crate) fn present<'de, D: Deserializer<'de>, T: Deserialize<'de>>(
    deserializer: D,
) -> Result<Option<T>, D::Error> {
    T::deserialize(deserializer).map(Some)
}
