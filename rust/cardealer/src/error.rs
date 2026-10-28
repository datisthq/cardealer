#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Parse(#[from] serde_json::Error),
    #[error("{0}")]
    Constraint(String),
}
