---
name: standard-development
description: Use when changing standard/ (schemas, profile, specs, overview examples). The sync checklist that keeps the three twins, the conformance cases and the docs in step with the schemas, since there are no generators.
---

# Standard

`standard/` is the source of truth and is hand-written. There are no generators, so every
change is carried by hand into the places below. **Every step lands in the same branch**, in
this order: schema, spec prose, three twins, conformance cases, overview examples and README,
release-please markers if a URL constant was added. Then run `pnpm type`, `pnpm test:unit`,
`pnpm docs:build`.

## Files

- `standard/schemas/{car,dealer,facility}.json` - table schemas (Fairspec table-schema profile)
- `standard/profiles/dataset.json` - dataset profile; uses `{version}` placeholders
- `standard/specs/data/<table>.md` - column tables; `standard/specs/metadata.md` - resources.
  Cite cardealer URLs with the literal `<version>` text, never a number
- `standard/overview/{examples,software}.md` and `README.md` - examples (resources use the
  `tableSchema` key)
- twins: `typescript/models/<table>.ts` (+ `enums.ts`), `python/cardealer/models/<table>.py`
  (+ `enums.py`), `rust/cardealer/src/models/<table>.rs` (+ `enums.rs`)
- cases: `conformance/tests/<table>/*.json`

`.scripts/-test/docs.unit.ts` fails when a schema column or enum value is missing from its spec
page, or a resource from `metadata.md`.

## New column

1. Add it to `properties` (and `required` if mandatory) in the schema
2. Add a row to `specs/data/<table>.md` (`<strong>name</strong>`, or `name?` when optional)
3. Add the field to all three twins; optional columns reject explicit `null` (see each twin's
   skill); `type: integer` accepts integral floats
4. Conformance: a valid row with it and a wrong-type case in `types.json`; required: a case in
   `required.json`; optional: a case in `optional.json` including explicit `null`
5. Add it to the examples where the table appears
6. Commit `feat`

## New enum value (e.g. a facility type)

1. `enum` and description text in the schema
2. The spec column text, and the value table on the spec page
3. The enum in all three twins (`enums.ts`, `enums.py`, `enums.rs`)
4. Conformance: the value valid, an unknown value invalid (`enums.json`, or `types.json` for
   `facility`)
5. Examples when the value is user-visible; commit `feat`

Facility types are final: `showroom`, `service`, `warehouse`, `delivery`, `office`. A new type
needs its row in the spec's facility types table, a valid conformance case and a twin enum entry
in the same branch.

## Bound change (min, max, length, count)

1. Schema keyword and the spec constraint text
2. All three twins: zod `.min/.max`, Python `Field(ge/le/min_length)`, Rust `check()` (serde
   cannot enforce bounds, counts or consts)
3. Conformance in `bounds.json`: valid at the bound, invalid just beyond it
4. Commit `fix` (tighten/loosen) or `feat` (new bound)

## New resource / table

1. `standard/schemas/<name>.json`; add the resource to `standard/profiles/dataset.json`
2. `specs/data/<name>.md` and a `metadata.md` entry; add the name to `TABLES` and `MODELS` in
   `.scripts/-shared/conformance.ts`
3. A model, a `<Name>Resource` and the union entry in each twin; export from each barrel
4. A new schema URL constant needs the `x-release-please-version` marker and its file listed in
   `.release/config.json`
5. `conformance/tests/<name>/`, a `dataset/resources.json` case, and the model map in each twin's
   runner
6. Examples and the README resource list; commit `feat`

## Base fairspec version bump

1. Bump the base lib versions in all three twins (see `monorepo-layout`)
2. Update the Fairspec profile URL in `standard/schemas/*.json` if it moved
3. Run every section; fix breakage in the twin, never by re-modelling a base field
4. Commit `ci` or `chore`; `fix` only when normative files changed

Published `.livemark/public/{profiles,schemas}/<v>/` are written by the Release PR and never
edited by hand.
