# Conformance

The language-neutral conformance test suite that every cardealer model library runs: the same
input data, the same model, the same expected outcome. The TypeScript, Python and Rust models
all run it, so a difference between them is a failing test rather than a surprise for a user.

The format follows [JSON-Schema-Test-Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Layout

```
conformance/
  test-schema.json             JSON Schema of a test file
  tests/<model>/<feature>.json
```

Each directory under `tests/` is one model: `dataset`, `car`, `dealer` or `facility`. Each
file covers one feature of it. A runner fails on a directory it does not know.

## Test files

A file is an array of groups. A group names what it covers; its tests give the data and the
outcome:

```json
[
  {
    "description": "integer columns",
    "tests": [
      {
        "description": "a fractional year is invalid",
        "data": { "year": 2023.5 },
        "valid": false
      }
    ]
  }
]
```

A group has a `description` and `tests`, and may carry a `comment` and `specification` (links
to the spec sections it exercises). A test has a `description`, its `data`, `valid`, and may
carry a `comment`. No other key is allowed.

- `data` is a row for the `car`, `dealer` and `facility` models, and a whole dataset
  descriptor for the `dataset` model
- `valid` is the only outcome: whether the model accepts the data. Error text is not
  normative, so it is never compared

Dataset cases write cardealer URLs with the literal `{version}` placeholder, as in
`https://datisthq.github.io/cardealer/profiles/{version}/dataset.json`. Every runner replaces
each `{version}` in `data` with its own `VERSION` before parsing.

Every dataset case is a valid base-Fairspec descriptor apart from what it tests. Base Fairspec
rules belong to Fairspec's own conformance suite.

## Oracle

The suite is checked against the JSON Schemas in `standard/` by
`.scripts/-test/conformance.unit.ts`, run by `pnpm test:unit`. A case whose `valid` disagrees
with the schemas is a wrong case: fix the case, never the oracle.

- A row model is `{ type: "object", required, properties }` from
  `standard/schemas/<model>.json`
- The dataset model is `standard/profiles/dataset.json`, resolved to `VERSION` and without the
  base Fairspec `$ref`, and every resource's `data` items must also match the row model its
  `name` names

The schemas are compiled with Ajv 2020, `strict: false` and `validateFormats: false`. `format`
is a Fairspec column rule the models don't enforce, so no case depends on it.

## Runners

Each language writes its own loader and, for every case:

1. replaces `{version}` in `data` with its `VERSION`
2. parses `data` with the model the directory names
3. asserts that parsing succeeds exactly when `valid` is true

Each file is also validated against `test-schema.json`.
