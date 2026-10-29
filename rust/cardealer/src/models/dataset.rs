use serde::Deserialize;
use serde_json::Value;

use super::resource::{CardealerResource, ResourceView};
use crate::error::Error;

const PROFILE: &str = "https://datisthq.github.io/cardealer/profiles/0.5.0/dataset.json"; /* x-release-please-version */

#[derive(Debug, Clone, PartialEq)]
pub struct Dataset {
    pub base: fairspec_metadata::Dataset,
    pub resources: Vec<CardealerResource>,
}

#[derive(Deserialize)]
struct DatasetView {
    #[serde(rename = "$schema")]
    schema: String,
    resources: Vec<ResourceView>,
}

impl Dataset {
    pub fn from_value(value: Value) -> Result<Self, Error> {
        let mut base: fairspec_metadata::Dataset = serde_json::from_value(value.clone())?;
        let view: DatasetView = serde_json::from_value(value)?;
        view.check()?;
        let bases = base.resources.take().unwrap_or_default();
        let resources = view
            .resources
            .into_iter()
            .zip(bases)
            .map(|(resource, base)| resource.join(base))
            .collect();
        Ok(Self { base, resources })
    }
}

impl DatasetView {
    fn check(&self) -> Result<(), Error> {
        if self.schema != PROFILE {
            return Err(Error::Constraint(format!("$schema must be {PROFILE}")));
        }
        if self.resources.is_empty() {
            return Err(Error::Constraint(
                "resources must have at least 1 item".into(),
            ));
        }
        self.resources.iter().try_for_each(ResourceView::check)
    }
}
