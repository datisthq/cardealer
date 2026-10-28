import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vite-plus/test"
import { Car, Dataset, Dealer, Facility, VERSION } from "../index.ts"

const TESTS = join(import.meta.dirname, "..", "..", "conformance", "tests")

const MODELS = { dataset: Dataset, car: Car, dealer: Dealer, facility: Facility }

const directories = readdirSync(TESTS, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

describe("conformance", () => {
  it("every directory under tests is a known model", () => {
    expect(directories.filter(name => !(name in MODELS))).toEqual([])
  })

  for (const directory of directories) {
    const model = getModel(directory)
    if (!model) continue

    const names = readdirSync(join(TESTS, directory)).filter(name =>
      name.endsWith(".json"),
    )
    for (const name of names) {
      const groups: Group[] = JSON.parse(
        readFileSync(join(TESTS, directory, name), "utf8"),
      )

      for (const group of groups) {
        describe(`${directory}/${name} > ${group.description}`, () => {
          for (const test of group.tests) {
            it(test.description, () => {
              const data = JSON.parse(
                JSON.stringify(test.data).replaceAll("{version}", VERSION),
              )
              expect(model.safeParse(data).success).toBe(test.valid)
            })
          }
        })
      }
    }
  }
})

function getModel(name: string) {
  return Object.entries(MODELS).find(([key]) => key === name)?.[1]
}

interface Group {
  description: string
  tests: Array<{ description: string; data: unknown; valid: boolean }>
}
