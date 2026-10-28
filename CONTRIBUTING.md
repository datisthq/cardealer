---
title: Contributing
path: /overview/contributing/
icon: heart-handshake
order: 99
---

Here you can find the guidelines for contributing to the extension. We welcome any kind of contributions either by opening issues or by submitting pull requests.

## Prerequisites

- **Development**:
  - Node 24+ (with pnpm) - [How to Install](https://nodejs.org/en/download/current)
  - Python 3.12+ (with uv) - [How to Install](https://docs.astral.sh/uv/getting-started/installation)
  - Rust (with cargo) - [How to Install](https://www.rust-lang.org/tools/install)
  - A [Fairspec](https://github.com/datisthq/fairspec) checkout beside this repository (`../fairspec`), with `pnpm -C ../fairspec/typescript build` run once - the libraries build on its unreleased base libraries
- **Releasing**:
  - Configured a pending trusted publisher on [PyPI](https://pypi.org/manage/account/publishing/) matching the extension name (slug)
  - Created an access token on [NPM](https://www.npmjs.com/settings/roll/tokens), added to [Github](https://github.com/datisthq/cardealer/settings/secrets/actions) as a repository secret `NPM_TOKEN`
  - In case you use it on GitHub, updated the publishing source in [the settings](https://github.com/datisthq/cardealer/settings/pages) to `Github Actions`.

## Development

> [!NOTE]
> If you not familiar with the Git workflow, we recommend reading of how to [clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and how to [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### Getting Started

Start by cloning the repository or its fork, installing the dependencies, and starting the site:

```bash
git clone https://github.com/datisthq/cardealer.git
cd cardealer
pnpm install
pnpm start
```

### Managing the Project

- **`pnpm install`** - Install dependencies
- **`pnpm build`** - Build the TypeScript, Python and Rust packages
- **`pnpm publish:profiles`** - Publish the current version's profiles and schemas to the site
- **`pnpm format`** - Format the project files to consistent style
- **`pnpm start`** - Start the documentation site in development mode
- **`pnpm test`** - Verify project integrity

### Working on the Extension

The fiels you need to edit to update the extension:

- **standard/profiles/** - Edit the profile to model your dataset
- **standard/schemas/** - Edit the schemas to model your data tables
- **standard/specs/** - Edit the specification prose
- **standard/overview/** - Edit the overview and examples
- **typescript/**, **python/**, **rust/** - Edit the three libraries to match
- **conformance/** - Edit the cases that pin the behaviour
- **.livemark/routes/index.tsx** - Edit the homepage

There are no generators: a change to the standard is carried by hand into the specification, all three libraries and the conformance cases in the same pull request. The `.agents/skills/standard-development` skill is the checklist.

## Releasing

> [!NOTE]
> It is also possbile to commit directly to the `main` branch using conventional commits, but we recommend using pull requests for this purpose.

After your pull request is ready to be merged, you can release a new version of the extension by merging the pull request into the `main` branch:

1. Squash and merge the PR using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).
2. In case you use it on GitHub, Github Actions will automatically create a new release (publishing to PyPI and NPM waits for the Fairspec base libraries to be released), publish the documentation to GitHub Pages.
