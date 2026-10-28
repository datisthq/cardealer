use std::fs;
use std::path::{Path, PathBuf};

use cardealer::{Car, Dataset, Dealer, Error, Facility, VERSION};
use serde_json::Value;

const TESTS: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/../../conformance/tests");
const MODELS: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/src/models");

#[test]
fn every_directory_is_a_known_model() {
    let unknown: Vec<String> = directories()
        .iter()
        .filter_map(|path| file_name(path))
        .filter(|name| get_model(name).is_none())
        .collect();
    assert_eq!(unknown, Vec::<String>::new());
}

#[test]
fn urls_carry_the_current_version() {
    for path in entries(Path::new(MODELS)) {
        let text = fs::read_to_string(&path).expect("model file");
        for line in text.lines() {
            if line.contains("datisthq.github.io/cardealer") {
                assert!(
                    line.contains(&format!("/{VERSION}/")),
                    "{}: {}",
                    path.display(),
                    line.trim()
                );
            }
        }
    }
}

#[test]
fn conformance() {
    let mut failures = Vec::new();
    let mut count = 0;
    for directory in directories() {
        let Some(name) = file_name(&directory) else {
            continue;
        };
        let Some(model) = get_model(&name) else {
            continue;
        };
        for file in entries(&directory) {
            if file.extension().is_none_or(|extension| extension != "json") {
                continue;
            }
            let text = fs::read_to_string(&file).expect("test file");
            let groups: Vec<Group> = serde_json::from_str(&text).expect("test groups");
            for group in groups {
                for test in group.tests {
                    count += 1;
                    let text = serde_json::to_string(&test.data)
                        .expect("test data")
                        .replace("{version}", VERSION);
                    let data: Value = serde_json::from_str(&text).expect("test data");
                    let result = model(data);
                    if result.is_ok() != test.valid {
                        let detail = match result {
                            Ok(()) => "parsed".to_string(),
                            Err(error) => error.to_string(),
                        };
                        failures.push(format!(
                            "{name}/{} > {} > {}: expected valid={}, {detail}",
                            file_name(&file).unwrap_or_default(),
                            group.description,
                            test.description,
                            test.valid,
                        ));
                    }
                }
            }
        }
    }
    assert!(count > 0, "no conformance cases found");
    assert!(
        failures.is_empty(),
        "{} of {count} cases failed:\n{}",
        failures.len(),
        failures.join("\n")
    );
}

type Model = fn(Value) -> Result<(), Error>;

fn get_model(name: &str) -> Option<Model> {
    match name {
        "dataset" => Some(|value| Dataset::from_value(value).map(drop)),
        "car" => Some(|value| Car::from_value(value).map(drop)),
        "dealer" => Some(|value| Dealer::from_value(value).map(drop)),
        "facility" => Some(|value| Facility::from_value(value).map(drop)),
        _ => None,
    }
}

fn directories() -> Vec<PathBuf> {
    entries(Path::new(TESTS))
        .into_iter()
        .filter(|path| path.is_dir())
        .collect()
}

fn entries(directory: &Path) -> Vec<PathBuf> {
    let mut paths: Vec<PathBuf> = fs::read_dir(directory)
        .expect("directory")
        .map(|entry| entry.expect("entry").path())
        .collect();
    paths.sort();
    paths
}

fn file_name(path: &Path) -> Option<String> {
    path.file_name()
        .and_then(|name| name.to_str())
        .map(str::to_string)
}

#[derive(serde::Deserialize)]
struct Group {
    description: String,
    tests: Vec<Test>,
}

#[derive(serde::Deserialize)]
struct Test {
    description: String,
    data: Value,
    valid: bool,
}
