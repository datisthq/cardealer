---
name: rust-development
description: Use when working in rust/ - the cardealer crate, serde models that parse through fairspec-metadata. Covers commands, layout, the double-parse extension, strictness rules, the path dependency and the no-publish rule.
---

# Rust

`rust/` is a Cargo workspace with the `cardealer` crate (`rust/cardealer`), serde models built
on `fairspec-metadata`.

## Commands

`pnpm -C rust type` (`cargo check --all-targets`), `test:unit` (`cargo test`), `build`
(`cargo build --release`).

## Dependency and publishing

`fairspec-metadata = { path = "../../../fairspec/rust/metadata" }` - the unreleased local
Fairspec checkout (CI pins it; see `monorepo-layout`). The crate has `publish = false`. Do not
publish until Fairspec releases `fairspec-metadata` to crates.io; then switch to a registry
version and add a Rust publish job.

The committed `rust/Cargo.lock` must be generated against the CI-pinned fairspec, not the local checkout. Export the pinned `rust/` with `git -C ../fairspec archive <pin> rust | tar -x -C <tmp>/fairspec`, export this repo's `rust conformance standard` the same way into `<tmp>/cardealer`, run `cargo generate-lockfile && cargo test` in `<tmp>/cardealer/rust`, copy the `Cargo.lock` back. A local `pnpm -C rust test:unit` rewrites the lock for the local fairspec HEAD: `git checkout rust/Cargo.lock` afterwards.

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
