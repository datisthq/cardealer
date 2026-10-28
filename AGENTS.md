# Agents

This file provides guidance to coding agents when working with code in this repository.

## General

- Prioritize using LSP capabilities if possible
- When resolving a TODO, follow its instructions literally
- Run type checking as part of your tasks
- Don't run linting as part of your tasks
- Start plan from a summary a new/updated API summary (models/signatures) and most challenging points, continue plan using your default settings
- **After every task, check whether a skill in `.agents/skills/` needs updating, and update it in the same commit.** Read the task description for what it taught: a new convention, a correction to how the work was done, or a decision about how an area should look or behave. Write that into the skill for that area, so the next session follows it without being told again. When no skill covers the area and the lesson will recur, add one.

## Sections

Fairspec Cardealer is one repo and one version: a standard and three hand-written libraries.

| section        | what                                                          | released as                        |
| -------------- | ------------------------------------------------------------- | ---------------------------------- |
| `standard/`    | `profiles/`, `schemas/`, `specs/` (normative) and `overview/` | profiles and schemas on the site   |
| `typescript/`  | zod models extending `@fairspec/metadata`                     | npm `cardealer` (publish blocked)  |
| `python/`      | pydantic models subclassing `fairspec-metadata`               | PyPI `cardealer` (publish blocked) |
| `rust/`        | serde models parsing through `fairspec-metadata`              | not published yet                  |
| `conformance/` | language-neutral JSON cases every twin runs                   | —                                  |

The site (`livemark.config.ts`, `.livemark/`) renders `standard/**/*.md`, `README.md` and
`CONTRIBUTING.md`.

## Terminology

- **Facility type**: one of `showroom`, `service`, `warehouse`, `delivery`, `office`; the `type` column of `facility`, final until the standard adds one
- **Twin**: the TypeScript, Python or Rust library; the three are equivalent implementations of
  `standard/` and are kept equal by hand and by `conformance/`

## Invariants

- **A change to `standard/` lands, in the same branch, in the spec prose in `standard/specs/`, all
  three twins, the conformance cases that pin it, and the overview examples it reaches.** There are no generators:
  `standard-development` is the checklist
- Each twin extends its language's fairspec base lib and never re-models a Fairspec field
- The base libs are local and unreleased (`../fairspec`); publishing is blocked until Fairspec
  releases them
- Conformance cases are fixed against the oracle (`.scripts/-test/conformance.unit.ts`); a failing
  twin is a twin bug

## Skills

Depth lives in `.agents/skills/` (reached by Claude Code through the `.claude/skills` symlink `pnpm install` creates), so
this file carries invariants and the skills carry procedure. Reach for one before working in
its area. Each is named `<subject>-<facet>`, subject first (`change-review`):

| skill                     | when                                                                   |
| ------------------------- | ---------------------------------------------------------------------- |
| `monorepo-layout`         | adding a script, CI job, version constant or page; where things live   |
| `standard-development`    | changing `standard/` — the sync checklist across twins, cases and docs |
| `conformance-development` | adding or fixing conformance cases                                     |
| `typescript-development`  | working in `typescript/`                                               |
| `python-development`      | working in `python/`                                                   |
| `rust-development`        | working in `rust/`                                                     |
| `change-review`           | reviewing a pull request — also what the review workflow runs          |

## Commands

- Run `pnpm install` to install all dependencies
- Run `pnpm lint` to lint the code using vite-plus
- Run `pnpm format` to auto-fix formatting issues with vite-plus
- Run `pnpm type` to check TypeScript types
- Run `pnpm -C <section> <script>` to run a script of one section, e.g. `pnpm -C python type`

## Formats

- Use 2-space indentation, UTF-8 encoding, and LF line endings
- Use PascalCase for classes and interfaces, and camelCase for methods and variables
- Place high-level public items first in a file and low-level private items last
- Use ES modules with full import paths including the ".ts(x)" file extension

## Types

- Use strict TypeScript with null checks but don't add explicit return types to functions
- Never use TypeScript `any`, type casting `as`, or `!` without permission

## Releases

Conventional Commits drive [release-please](https://github.com/googleapis/release-please): a
`feat` or `fix` landing on `main` opens a Release PR. **Merging that PR is the gate** — it bumps
the version files, tags the release and creates the GitHub release. Publishing to npm and PyPI is
blocked until Fairspec releases its base libs.

- **IMPORTANT: only changes to the normative artifacts use `feat` or `fix`** — `standard/profiles/`,
  `standard/schemas/`, and `standard/specs/`. Everything else MUST be `chore`, `ci` or `docs`: the
  website, `standard/overview/`, `README.md`, the twins' internals, CI and workflows, release
  config, dependencies, tooling, this file
- Never use `!` or `BREAKING CHANGE`
- This is not a style preference. release-please reads the commit type, and a `fix:` on a workflow
  file announces a specification change that did not happen and burns a version number that can
  never be reused
- The Release PR carries a second commit from `github-actions[bot]` with the published profiles
  and schemas copy (`.livemark/public/{profiles,schemas}/<version>/`). **Review that diff as the
  release itself**; published folders never change afterward
- Never hand-edit `.release/manifest.json`; release-please owns it. A new hard-coded version URL
  needs the `x-release-please-version` marker and its file listed in `.release/config.json`

## Docs

- Add Typedoc comments only for public APIs and don't add them for files or use @params directives
- Don't write `//` comments in the code
