---
name: monorepo-layout
description: Where things live in the cardealer repo and how root scripts, sections, CI, versions and the site fit together. Use when adding a section, a script, a CI job, a version constant or a page, or when unsure which section owns a file.
---

# Monorepo layout

One repo, five sections, one site, one version. The root owns everything shared; a section
owns only what is specific to it.

| section        | what                                                               | ships as                         |
| -------------- | ------------------------------------------------------------------ | -------------------------------- |
| `standard/`    | `profiles/`, `schemas/` (normative JSON), `specs/` and `overview/` | profiles and schemas on the site |
| `typescript/`  | zod twin on `@fairspec/metadata`                                   | npm `cardealer` (blocked)        |
| `python/`      | pydantic twin on `fairspec-metadata`                               | PyPI `cardealer` (blocked)       |
| `rust/`        | serde twin on `fairspec-metadata`                                  | not published yet                |
| `conformance/` | language-neutral JSON cases every twin runs                        | nothing                          |

Root-only: `.scripts/` (publisher `@publish.ts`, `-shared/`, `-test/*.unit.ts` run by `vp test`),
`.release/`, `.github/`, `.agents/`, `.livemark/`, `livemark.config.ts`, `README.md`,
`CONTRIBUTING.md`, `CHANGELOG.md`. The site renders `standard/**/*.md`, README and CONTRIBUTING;
the page path comes from each file's `path:` frontmatter. Livemark 0.29.3 has no redirects, so a
removed page 404s.

## Commands

Root: `pnpm type`, `pnpm test:unit` (root `vp test` plus every section), `pnpm build`,
`pnpm docs:build`, `pnpm publish:profiles`. Per section: `pnpm -C <section> <script>`
(`type`, `test:unit`, `build`). Never run lint as a task step.

## Base libs are local and unreleased

All three twins depend on a Fairspec checkout beside this repo (`../fairspec`):

- TS `"@fairspec/metadata": "link:../../fairspec/typescript/metadata"`; run
  `pnpm -C ../fairspec/typescript build` first (its exports point at `build/`)
- Python `[tool.uv.sources]` editable path `../../fairspec/python/metadata`
- Rust cargo path `../../../fairspec/rust/metadata`

CI checks out this repo at `path: cardealer` and `datisthq/fairspec` at a pinned SHA at
`path: fairspec`, with `working-directory: cardealer`. Bump the SHA deliberately, in its own
`ci:` commit, after running every section against the new base, and regenerate `rust/Cargo.lock`
against the new pin (procedure in `rust-development`).

The `publish` job in `release.yaml` is `if: false` until Fairspec releases its base libs. Then:
switch the three dependencies to registry versions, drop the fairspec checkout where no longer
needed, re-enable `publish` (it also needs the rust and fairspec setup) and add a Rust publish.

## Versioning

One release component, one version, one tag, one changelog. release-please bumps the version
in `standard/package.json`, `typescript/package.json`, `python/pyproject.toml`,
`rust/Cargo.toml` and `rust/Cargo.lock`, plus every line marked `x-release-please-version`:
`typescript/settings.ts`, `python/cardealer/settings.py`,
`python/cardealer/models/{dataset,resource}.py`, `rust/cardealer/src/settings.rs`,
`rust/cardealer/src/models/{dataset,resource}.rs`.

A new hard-coded version URL must carry the marker AND its file must be listed in
`.release/config.json`; otherwise the next release leaves it behind. Normative JSON uses the
`{version}` placeholder instead. On the Release PR the workflow runs `pnpm publish:profiles`,
which writes `.livemark/public/{profiles,schemas}/<v>/`, `latest/` and `checksums.json`.
Published folders are immutable; `.scripts/-test/profiles.unit.ts` guards them.

## Commit types

`feat`/`fix` only for changes under `standard/profiles/`, `standard/schemas/`, `standard/specs/`.
Everything else is `chore`, `ci` or `docs`. Never `!` or `BREAKING CHANGE`.
