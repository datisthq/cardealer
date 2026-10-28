import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import standardPackage from "../standard/package.json" with { type: "json" }
import {
  CHECKSUMS,
  PUBLISHED,
  SOURCE_PROFILES,
  SOURCE_SCHEMAS,
  hashVersion,
  readChecksums,
  resolveVersion,
  sortChecksums,
} from "./-shared/profiles.ts"

const VERSION = standardPackage.version
const SOURCES = { profiles: SOURCE_PROFILES, schemas: SOURCE_SCHEMAS }
const checksums = await readChecksums()

if (checksums[VERSION]) {
  console.log(`Standard ${VERSION} is already published; its files never change`)
} else {
  for (const [folder, source] of Object.entries(SOURCES)) {
    const target = join(PUBLISHED, folder, VERSION)
    await rm(target, { recursive: true, force: true })
    await mkdir(target, { recursive: true })
    for (const name of await readdir(source)) {
      if (!name.endsWith(".json")) continue
      const text = await readFile(join(source, name), "utf8")
      await writeFile(join(target, name), resolveVersion(text, VERSION))
    }
  }
  checksums[VERSION] = await hashVersion(VERSION)
  await writeFile(CHECKSUMS, `${JSON.stringify(sortChecksums(checksums), null, 2)}\n`)
}

for (const folder of Object.keys(SOURCES)) {
  const latest = join(PUBLISHED, folder, "latest")
  await rm(latest, { recursive: true, force: true })
  await cp(join(PUBLISHED, folder, VERSION), latest, { recursive: true })
}
