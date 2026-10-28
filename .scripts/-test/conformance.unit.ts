import { readFileSync } from "node:fs"
import { Ajv2020 } from "ajv/dist/2020.js"
import { describe, expect, it } from "vite-plus/test"
import standardPackage from "../../standard/package.json" with { type: "json" }
import {
  MODELS,
  TEST_SCHEMA,
  createOracle,
  listCases,
  listFiles,
  listModels,
} from "../-shared/conformance.ts"

const VERSION = standardPackage.version
const oracle = createOracle(VERSION)
const cases = listCases()

describe("conformance suite", () => {
  it("every directory under tests is a known model", () => {
    expect(listModels()).toEqual([...MODELS].sort())
  })

  it("every test file matches test-schema.json", () => {
    const ajv = new Ajv2020({ strict: false, validateFormats: false })
    const validate = ajv.compile(JSON.parse(readFileSync(TEST_SCHEMA, "utf8")))
    for (const { model, file, content } of listFiles()) {
      expect(
        validate(content),
        `${model}/${file}: ${ajv.errorsText(validate.errors)}`,
      ).toBe(true)
    }
  })

  it("every case name is unique", () => {
    const names = cases.map(nameCase)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe("conformance cases", () => {
  for (const item of cases) {
    it(nameCase(item), () => {
      expect(oracle(item.model, item.data)).toBe(item.valid)
    })
  }
})

function nameCase(item: { model: string; file: string; group: string; test: string }) {
  return `${item.model}/${item.file} > ${item.group} > ${item.test}`
}
