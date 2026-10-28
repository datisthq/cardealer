---
name: python-development
description: Use when working in python/ - the cardealer PyPI package, pydantic models that subclass fairspec-metadata. Covers commands, layout, base extension, strictness rules, the ty override and how to find the twin of a change.
---

# Python

`python/` is the `cardealer` package: pydantic models for the cardealer standard, subclassing
`fairspec-metadata`.

## Commands

`pnpm -C python setup` (`uv sync`), `type` (`uv run ty check`), `test:unit` (`uv run pytest`),
`build` (`uv build`). The base is an editable path source
`[tool.uv.sources] fairspec-metadata = { path = "../../fairspec/python/metadata", editable = true }`.

## Layout

- `cardealer/__init__.py`, `models/__init__.py` - barrels with explicit re-exports
- `cardealer/settings.py` - `VERSION` (marker `x-release-please-version`)
- `models/{row,integer,enums,car,dealer,facility,resource,dataset}.py`
- `cardealer/_test/conformance_unit.py` - the conformance runner (`*_unit.py` pattern)

## Extending the base

`CarResource(fairspec_metadata.Resource)` etc. narrow `name` and `table_schema` to `Literal`
fields (alias `tableSchema`); `Dataset` subclasses the base `Dataset`. Never re-model a Fairspec
field. ty's `invalid-mutable-override` and `invalid-attribute-override` are ignored only for
`cardealer/models/{resource,dataset}.py` through `[[tool.ty.overrides]]`; do not widen that.

## Strictness

- `CardealerRow` sets `strict=True, extra="allow", populate_by_name=True`
- `Integer` (`integer.py`) accepts integral floats (`2023.0`), rejects fractional
- strict mode means no coercion (`"45990"`, `True` invalid for numbers)
- enums are `Literal[...]`, not `Enum`, so strict mode accepts the plain strings
- `CardealerRow._reject_nulls` (before-validator) rejects explicit `null` for every field,
  optional included
- unknown keys are kept (`extra="allow"`); `format` is not enforced
- `populate_by_name` makes snake_case keys real fields; keep it, do not rely on it in cases

## Finding the twin

The same change lands in `typescript/models/<same name>.ts` and
`rust/cardealer/src/models/<same name>.rs`. See `standard-development`.
