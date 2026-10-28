import { defineConfig } from "livemark"
import packageJson from "./package.json" with { type: "json" }

const { origin, pathname } = new URL(packageJson.homepage)

export default defineConfig({
  site: origin,
  base: command => (command === "build" ? pathname : "/"),
  title: packageJson.title,
  description: packageJson.description,
  logo: "/logo.svg",
  favicon: "/logo.png",
  include: ["standard/**/*.md", "README.md", "CONTRIBUTING.md"],
  exclude: ["standard/profiles/**", "standard/schemas/**", "standard/node_modules/**"],
  sections: [
    { title: "Docs", prefix: "/", icon: "book-open" },
    {
      title: "Changelog",
      prefix: "/changelog/",
      type: "changelog",
      source: "CHANGELOG.md",
      version: true,
      icon: "history",
    },
  ],
  links: [
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
        path: "/overview/contributing/",
        order: 99,
      },
    },
  ],
})
