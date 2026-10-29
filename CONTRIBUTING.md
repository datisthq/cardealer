---
title: Contributing
path: /contributing/
icon: heart-handshake
order: 99
---

> [!WARNING]
> **We don't accept pull requests from outside contributors.** Pull requests opened by anyone outside the team are closed without review. If you've found a bug or have an idea, open an issue or start a discussion instead, as described below.

Cardealer is an open-source Fairspec extension developed by the [Datist](https://datist.io) team. Everyone is welcome to help shape it with bug reports, ideas and questions; changes to the extension come from team members.

## Contributors

### Report a bug

Open an issue on [GitHub Issues](https://github.com/datisthq/cardealer/issues). A good report includes:

- the Cardealer version and how you use it
- the smallest dataset or profile that reproduces the problem
- the result you got and the result you expected

### Share an idea or ask a question

Use [GitHub Discussions](https://github.com/datisthq/cardealer/discussions) for anything that isn't a bug:

- [Ideas](https://github.com/datisthq/cardealer/discussions/new?category=ideas): features and improvements you'd like to see
- [Q&A](https://github.com/datisthq/cardealer/discussions/new?category=q-a): questions about using Cardealer
- [Show and tell](https://github.com/datisthq/cardealer/discussions/new?category=show-and-tell): projects built with Cardealer

Ideas the team picks up turn into issues.

## Members

The rest of this guide is for Datist team members working on Cardealer.

### Prerequisites

- **Development**:
  - Node 24+ (with pnpm) - [How to Install](https://nodejs.org/en/download/current)
  - Python 3.12+ (with uv) - [How to Install](https://docs.astral.sh/uv/getting-started/installation)
  - Rust (with cargo) - [How to Install](https://www.rust-lang.org/tools/install)
- **Releasing**:
  - Trusted publishers for `datisthq/cardealer`, workflow `release.yaml`, environment `release`, on [npm](https://docs.npmjs.com/trusted-publishers), [PyPI](https://pypi.org/manage/account/publishing/) and [crates.io](https://crates.io/docs/trusted-publishing)
  - In case you use it on GitHub, updated the publishing source in [the settings](https://github.com/datisthq/cardealer/settings/pages) to `Github Actions`.

### Development

#### Getting Started

Start by cloning the repository, installing the dependencies, and starting the site:

```bash
git clone https://github.com/datisthq/cardealer.git
cd cardealer
pnpm install
pnpm start
```

#### Managing the Project

- **`pnpm install`** - Install dependencies
- **`pnpm build`** - Build the TypeScript, Python and Rust packages
- **`pnpm publish:profiles`** - Publish the current version's profiles and schemas to the site
- **`pnpm format`** - Format the project files to consistent style
- **`pnpm start`** - Start the documentation site in development mode
- **`pnpm test`** - Verify project integrity

#### Working on the Extension

The fiels you need to edit to update the extension:

- **standard/profiles/** - Edit the profile to model your dataset
- **standard/schemas/** - Edit the schemas to model your data tables
- **standard/specs/** - Edit the specification prose
- **standard/overview/** - Edit the overview and examples
- **typescript/**, **python/**, **rust/** - Edit the three libraries to match
- **conformance/** - Edit the cases that pin the behaviour
- **.livemark/routes/index.tsx** - Edit the homepage

There are no generators: a change to the standard is carried by hand into the specification, all three libraries and the conformance cases in the same pull request. The `.agents/skills/standard-development` skill is the checklist.

### Releasing

> [!NOTE]
> It is also possbile to commit directly to the `main` branch using conventional commits, but we recommend using pull requests for this purpose.

After your pull request is ready to be merged, you can release a new version of the extension by merging the pull request into the `main` branch:

1. Squash and merge the PR using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).
2. In case you use it on GitHub, Github Actions will automatically create a new release (publishing to PyPI and NPM waits for the Fairspec base libraries to be released), publish the documentation to GitHub Pages.
