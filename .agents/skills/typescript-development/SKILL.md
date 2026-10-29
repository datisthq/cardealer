---
name: typescript-development
description: Use when working in typescript/ - the cardealer npm package, a zod twin that extends @fairspec/metadata. Covers commands, layout, how it extends the base, the strictness rules and how to find the twin of a change.
---

# TypeScript

`typescript/` is the `cardealer` package: zod models for the cardealer standard, built on
`@fairspec/metadata`.

## Commands

`pnpm -C typescript type` (`tsgo --noEmit`), `test:unit` (`vp test`), `build` (`tsgo`, to
`build/`). The base is the published `@fairspec/metadata` from npm.

## Layout

- `index.ts` - barrel with explicit re-exports
- `settings.ts` - `VERSION` (carries `x-release-please-version`)
- `models/{car,dealer,facility,enums,resource,dataset}.ts`
- `-test/conformance.unit.ts` - the conformance runner

## Extending the base

`Dataset = StandardDataset.extend({...})` and each resource is `Resource.extend({...})` with
literal `name`, `tableSchema` (built from `VERSION`) and typed `data`. Never re-model a Fairspec
field; narrow it. Row models (`Car`, ...) are plain `z.object`.

Two zod copies currently resolve (4.6.7 and 4.6.6) and work. If `.extend` ever breaks across
them, dedupe with pnpm `overrides`.

## Strictness

- integer columns are `z.number().int()`: `2023.0` parses to an integer and passes, `2023.5` fails; safe-integer range (2^53) applies
- no coercion: use no `z.coerce`
- `.optional()` already rejects explicit `null`; keep it, never `.nullable()`
- objects strip unknown keys, never `.strict()`
- `format` (url/email) is not enforced: plain `z.string()`

## Finding the twin

The same change lands in `python/cardealer/models/<same name>.py` and
`rust/cardealer/src/models/<same name>.rs`. See `standard-development` for the checklist.
