import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"
import { describe, expect, it } from "vite-plus/test"
import standardPackage from "../../standard/package.json" with { type: "json" }
import {
  FOLDERS,
  PUBLISHED,
  hashFolder,
  hashVersion,
  readChecksums,
} from "../-shared/profiles.ts"

const VERSION = standardPackage.version

describe("published profiles and schemas", () => {
  it("every published file matches its checksum", async () => {
    const checksums = await readChecksums()
    const versions = await listVersions()
    expect(Object.keys(checksums).sort()).toEqual([...versions].sort())
    for (const version of versions) {
      expect(await hashVersion(version), version).toEqual(checksums[version])
    }
  })

  it("the current version is published", async () => {
    const checksums = await readChecksums()
    const files = Object.keys(checksums[VERSION] ?? {})
    expect(files).toContain("profiles/dataset.json")
    expect(files.filter(file => file.startsWith("schemas/")).length).toBeGreaterThan(0)
    for (const file of files) {
      const text = await readFile(
        join(PUBLISHED, file.replace("/", `/${VERSION}/`)),
        "utf8",
      )
      expect(text, file).not.toContain("{version}")
    }
  })

  it("latest equals the current version", async () => {
    for (const folder of FOLDERS) {
      const latest = await hashFolder(join(PUBLISHED, folder, "latest"))
      const current = await hashFolder(join(PUBLISHED, folder, VERSION))
      expect(latest, folder).toEqual(current)
    }
  })
})

async function listVersions() {
  const entries = await readdir(join(PUBLISHED, "profiles"), { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory() && entry.name !== "latest")
    .map(entry => entry.name)
}
