---
name: rust-development
description: Use when working in rust/ - the cardealer crate, serde models that parse through fairspec-metadata. Covers commands, layout, the double-parse extension, strictness rules, the registry dependency and crates.io publishing.
---

# Rust

`rust/` is a Cargo workspace with the `cardealer` crate (`rust/cardealer`), serde models built
on `fairspec-metadata`.

## Commands

`pnpm -C rust type` (`cargo check --all-targets`), `test:unit` (`cargo test`), `build`
(`cargo build --release`).

## Dependency and publishing

`fairspec-metadata` is the published crates.io version; `rust/Cargo.lock` pins it. The crate
publishes to crates.io from the `crates` job in `release.yaml`; check it with
`cargo package -p cardealer` before changing its manifest.

## Layout

- `src/lib.rs` - explicit `pub use` re-exports; `src/error.rs`, `src/settings.rs` (`VERSION`)
- `src/models/{car,dealer,facility,enums,integer,resource,dataset}.rs`, `mod.rs` (`present`)
- `tests/conformance.rs` - the conformance runner (model map: a `match` on the directory name)

## Extending the base

`Dataset::from_value` parses twice: the base `fairspec_metadata::Dataset` (root re-exports,
`Dataset`/`Resource`) and a private `DatasetView`/`ResourceView`, then joins them. Never
re-model a Fairspec field. `check()` enforces what serde cannot: bounds, counts and consts
(`PROFILE`, `*_SCHEMA`; they carry `x-release-please-version`).

## Strictness

- `integer.rs` accepts integral floats, rejects fractional (limit 2^53, value as `i64`)
- serde types give no coercion: `"45990"` and `true` fail for numbers
- optional fields use `#[serde(default, deserialize_with = "present")]` so explicit `null`
  fails
- unknown keys are allowed (no `deny_unknown_fields`), but rows drop them
- `format` is not enforced
- `Dataset` and resources are parse-only, not `Serialize`

## Finding the twin

The same change lands in `typescript/models/<same name>.ts` and
`python/cardealer/models/<same name>.py`. See `standard-development`.
