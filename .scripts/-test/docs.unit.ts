import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vite-plus/test"
import { ROOT } from "../-shared/profiles.ts"
import { TABLES } from "../-shared/conformance.ts"

const SECTIONS = ["standard", "typescript", "python", "rust", "conformance"]

interface Schema {
  properties: Record<string, { enum?: unknown[] }>
}

describe("documentation", () => {
  it("every schema column is documented", () => {
    for (const table of TABLES) {
      const schema: Schema = JSON.parse(read("standard", "schemas", `${table}.json`))
      const spec = read("standard", "specs", "data", `${table}.md`)
      for (const [name, column] of Object.entries(schema.properties)) {
        expect(spec, `${table}.${name}`).toMatch(
          new RegExp(`<strong>${name}\\??</strong>`),
        )
        for (const value of column.enum ?? []) {
          expect(spec, `${table}.${name} = ${value}`).toMatch(
            new RegExp(`<code>[^<]*\\b${value}\\b[^<]*</code>`),
          )
        }
      }
    }
    const metadata = read("standard", "specs", "metadata.md")
    for (const table of TABLES) {
      expect(metadata, table).toContain(`"${table}"`)
    }
  })

  it("every section has a skill", () => {
    const agents = read("AGENTS.md")
    for (const section of SECTIONS) {
      const skill = join(ROOT, ".agents", "skills", `${section}-development`, "SKILL.md")
      expect(existsSync(skill), skill).toBe(true)
      expect(agents, section).toContain(`\`${section}/\``)
      expect(agents, section).toContain(`\`${section}-development\``)
    }
  })
})

function read(...path: string[]) {
  return readFileSync(join(ROOT, ...path), "utf8")
}
