import { defineConfig } from "vite-plus"

const ignorePatterns = ["CHANGELOG.md"]

export default defineConfig({
  test: {
    include: [".scripts/-test/*.unit.ts"],
  },
  fmt: {
    semi: false,
    printWidth: 90,
    arrowParens: "avoid",
    ignorePatterns,
  },
  lint: {
    ignorePatterns,
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
})
