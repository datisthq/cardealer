---
name: conformance-development
description: Use when adding or fixing conformance cases in conformance/, or when a twin disagrees with the standard. Covers case format, the root oracle, the twin runners and which behaviours are deliberately outside the suite.
---

# Conformance

`conformance/tests/<model>/<feature>.json` holds hand-written cases in the JSON-Schema-Test-Suite
shape (see `conformance/README.md`). Models: `dataset`, `car`, `dealer`, `facility`. A case is
`{description, data, valid}`; `data` is a row (a whole descriptor for `dataset`). Dataset cases
write cardealer URLs with `{version}`; each runner substitutes its own `VERSION`.

## Oracle and runners

- Root oracle `.scripts/-test/conformance.unit.ts` (`vp test`) proves every case against
  `standard/schemas` and `standard/profiles`. A case the oracle rejects is a wrong case: **fix
  the case, never the oracle**
- Runners: `typescript/-test/conformance.unit.ts`, `python/cardealer/_test/conformance_unit.py`,
  `rust/cardealer/tests/conformance.rs`. A failing twin is a twin bug: fix the twin, not the case
- A new model directory needs the oracle's `MODELS` (`.scripts/-shared/conformance.ts`) and a
  model map entry in each runner

## Writing cases

- One behaviour per case, a description that states the outcome ("a fractional year is invalid")
- Pair every invalid case with a valid sibling that differs only in the tested aspect
- Keep raw `.0` in JSON for integral floats (`2023.0`); never reformat it
- Only base-Fairspec-valid descriptors apart from what the case tests
- No case may depend on `format` (url/email); no twin enforces it

## Strictness every twin must keep

- integral float valid for an integer column, fractional invalid
- no coercion: `"45990"` and `true` are invalid for numbers
- explicit `null` invalid for every column, optional included
- unknown keys allowed

## Deliberately not covered

Rust rows drop unknown fields, Python keeps them, TS strips them; Rust `Dataset`/resources are
parse-only (not `Serialize`); integer range differs (TS up to 2^53, Rust `i64`, Python
unbounded); Python `populate_by_name` makes snake_case keys real fields. Do not add cases
that pin these.

## Workflow

Add the case, run `vp test` (oracle), then each twin: `pnpm -C typescript test:unit`,
`pnpm -C python test:unit`, `pnpm -C rust test:unit`. Commit `chore` (or with the normative
change that motivated it).
