import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js"
import { ROOT, SOURCE_PROFILES, SOURCE_SCHEMAS, resolveVersion } from "./profiles.ts"

export const CONFORMANCE = join(ROOT, "conformance")
export const CONFORMANCE_TESTS = join(CONFORMANCE, "tests")
export const TEST_SCHEMA = join(CONFORMANCE, "test-schema.json")
export const MODELS = ["dataset", "car", "dealer", "facility"]
export const TABLES = ["car", "dealer", "facility"]

export interface Case {
  model: string
  file: string
  group: string
  test: string
  data: unknown
  valid: boolean
}

export function listModels() {
  return readdirSync(CONFORMANCE_TESTS, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

export function listFiles() {
  const files: Array<{ model: string; file: string; content: unknown }> = []
  for (const model of listModels()) {
    const names = readdirSync(join(CONFORMANCE_TESTS, model))
      .filter(name => name.endsWith(".json"))
      .sort()
    for (const name of names) {
      const content: unknown = readJson(join(CONFORMANCE_TESTS, model, name))
      files.push({ model, file: name.slice(0, -".json".length), content })
    }
  }
  return files
}

export function listCases() {
  const cases: Case[] = []
  for (const { model, file, content } of listFiles()) {
    if (!Array.isArray(content))
      throw new Error(`Conformance file is not an array: ${model}/${file}`)
    for (const group of content) {
      if (
        !isRecord(group) ||
        typeof group.description !== "string" ||
        !Array.isArray(group.tests)
      )
        throw new Error(`Invalid conformance group in ${model}/${file}`)
      for (const test of group.tests) {
        if (
          !isRecord(test) ||
          typeof test.description !== "string" ||
          typeof test.valid !== "boolean"
        )
          throw new Error(`Invalid conformance test in ${model}/${file}`)
        cases.push({
          model,
          file,
          group: group.description,
          test: test.description,
          data: test.data,
          valid: test.valid,
        })
      }
    }
  }
  return cases
}

export function createOracle(version: string) {
  const ajv = new Ajv2020({ strict: false, validateFormats: false })
  const rows = new Map<string, ValidateFunction>()
  for (const table of TABLES) {
    const schema = readJson(join(SOURCE_SCHEMAS, `${table}.json`))
    if (!isRecord(schema)) throw new Error(`Invalid schema: ${table}`)
    rows.set(
      table,
      ajv.compile({
        type: "object",
        required: schema.required,
        properties: schema.properties,
      }),
    )
  }

  const profile = JSON.parse(
    resolveVersion(readFileSync(join(SOURCE_PROFILES, "dataset.json"), "utf8"), version),
  )
  profile.allOf = profile.allOf.filter(
    (entry: { $ref?: string }) => !entry.$ref?.startsWith("https://fairspec.org/"),
  )
  const dataset = ajv.compile(profile)

  return (model: string, data: unknown) => {
    const resolved: unknown = JSON.parse(resolveVersion(JSON.stringify(data), version))
    if (model === "dataset") {
      if (!dataset(resolved)) return false
      return listResources(resolved).every(resource => {
        const row = rows.get(resource.name)
        return row !== undefined && resource.data.every(item => row(item))
      })
    }
    const row = rows.get(model)
    if (!row) throw new Error(`Unknown model: ${model}`)
    return row(resolved)
  }
}

function listResources(dataset: unknown) {
  const resources: Array<{ name: string; data: unknown[] }> = []
  if (!isRecord(dataset) || !Array.isArray(dataset.resources)) return resources
  for (const resource of dataset.resources) {
    if (!isRecord(resource)) continue
    const { name, data } = resource
    if (typeof name === "string" && Array.isArray(data)) resources.push({ name, data })
  }
  return resources
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"))
}
