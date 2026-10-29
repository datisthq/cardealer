import { defineConfig } from "livemark"
import packageJson from "./package.json" with { type: "json" }

const { origin, pathname } = new URL(packageJson.homepage)

export default defineConfig({
  site: origin,
  base: command => (command === "build" ? pathname : "/"),
  title: packageJson.title,
  description: packageJson.description,
  banner:
    "Cardealer is in technical preview · [Share feedback →](https://github.com/datisthq/cardealer/discussions)",
  logo: "/logo.svg",
  favicon: "/logo.png",
  include: ["standard/**/*.md", "README.md", "CONTRIBUTING.md", "CHANGELOG.md"],
  exclude: ["standard/profiles/**", "standard/schemas/**", "standard/node_modules/**"],
  sections: [
    {
      title: "Standard",
      prefix: "/",
      icon: "book-open",
      siteTitle: "Cardealer",
      siteDescription: "Data exchange format",
    },
    {
      title: "Software",
      prefix: "/software/",
      icon: "laptop",
      siteTitle: "Cardealer",
      siteDescription: "Data exchange format",
    },
  ],
  links: [
    {
      url: "https://fairspec.org/",
      title: "Fairspec",
      icon: "globe",
    },
    {
      url: packageJson.repository,
      title: "GitHub",
      icon: "github",
    },
  ],
  patches: [
    {
      file: "README.md",
      article: {
        title: "Overview",
        icon: "book-open",
        path: "/overview/",
        order: 10,
      },
    },
    {
      file: "CONTRIBUTING.md",
      article: {
        title: "Contributing",
        description:
          "How to set up the extension locally, propose changes, and ship a release.",
        icon: "heart-handshake",
        path: "/contributing/",
        order: 99,
      },
    },
    {
      file: "CHANGELOG.md",
      article: {
        title: "Changelog",
        icon: "history",
        path: "/changelog/",
        order: -1,
      },
    },
  ],
})
