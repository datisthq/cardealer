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
| `typescript/`  | zod twin on `@fairspec/metadata`                                   | npm `cardealer`                  |
| `python/`      | pydantic twin on `fairspec-metadata`                               | PyPI `cardealer`                 |
| `rust/`        | serde twin on `fairspec-metadata`                                  | crates.io `cardealer`            |
| `conformance/` | language-neutral JSON cases every twin runs                        | nothing                          |

Root-only: `.scripts/` (publisher `@publish.ts`, `-shared/`, `-test/*.unit.ts` run by `vp test`),
`.release/`, `.github/`, `.agents/`, `.livemark/`, `livemark.config.ts`, `README.md`,
`CONTRIBUTING.md`, `CHANGELOG.md`. The site renders `standard/**/*.md`, README and CONTRIBUTING;
the page path comes from each file's `path:` frontmatter. Livemark 0.29.3 has no redirects, so a
removed page 404s.

The site mimics fairspec.org: `.livemark/styles/general.css` carries Fairspec's colour tokens and
`.livemark/components/Landing.tsx` is Fairspec's landing kit (hero carousel, sections, CTA),
trimmed to code-only slides. Port a Fairspec look change from `../fairspec/.livemark/` rather
than restyling here. Landing code samples are plain strings in `components/Samples.tsx`,
highlighted by its `Code` tokenizer; use `latest` profile and schema URLs there.

## Commands

Root: `pnpm type`, `pnpm test:unit` (root `vp test` plus every section), `pnpm build`,
`pnpm docs:build`, `pnpm publish:profiles`. Per section: `pnpm -C <section> <script>`
(`type`, `test:unit`, `build`). Never run lint as a task step.

## Base libs come from the registries

All three twins depend on the published Fairspec base libs; no `../fairspec` checkout is needed:

- TS `"@fairspec/metadata"` from npm (`typescript/package.json`)
- Python `fairspec-metadata` from PyPI (`python/pyproject.toml`)
- Rust `fairspec-metadata` from crates.io (`rust/cardealer/Cargo.toml`)

Bump them together, in their own `chore:` commit, after running every section against the new
versions. `@fairspec/*` is exempt from pnpm's `minimumReleaseAge`, so a fresh release installs at once.

When release-please creates a release, `release.yaml` publishes each twin in its own job
(`typescript`, `python`, `crates`), all in the `release` environment with OIDC trusted
publishing and no tokens. Each section's `release` script (or `cargo publish -p cardealer`) is
the one publish command; a twin that fails to publish is re-run from that job.

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
