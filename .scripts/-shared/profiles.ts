import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { readFile, readdir } from "node:fs/promises"
import { join, resolve } from "node:path"

export const ROOT = resolve(import.meta.dirname, "..", "..")
export const SOURCE_PROFILES = join(ROOT, "standard", "profiles")
export const SOURCE_SCHEMAS = join(ROOT, "standard", "schemas")
export const PUBLISHED = join(ROOT, ".livemark", "public")
export const CHECKSUMS = join(PUBLISHED, "checksums.json")
export const FOLDERS = ["profiles", "schemas"]

export type Checksums = Record<string, Record<string, string>>

export function resolveVersion(text: string, version: string) {
  return text.replaceAll("{version}", version)
}

export async function hashFolder(folder: string) {
  const entries = await readdir(folder, { recursive: true, withFileTypes: true })
  const hashes: Record<string, string> = {}
  const paths = entries
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name))
    .sort()
  for (const path of paths) {
    const name = path.slice(folder.length + 1).replaceAll("\\", "/")
    hashes[name] = createHash("sha256")
      .update(await readFile(path))
      .digest("hex")
  }
  return hashes
}

export async function hashVersion(version: string) {
  const hashes: Record<string, string> = {}
  for (const folder of FOLDERS) {
    const folderHashes = await hashFolder(join(PUBLISHED, folder, version))
    for (const [name, hash] of Object.entries(folderHashes)) {
      hashes[`${folder}/${name}`] = hash
    }
  }
  return hashes
}

export async function readChecksums() {
  const checksums: Checksums = existsSync(CHECKSUMS)
    ? JSON.parse(await readFile(CHECKSUMS, "utf8"))
    : {}
  return checksums
}

export function sortChecksums(checksums: Checksums) {
  const versions = Object.keys(checksums).sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true }),
  )
  return Object.fromEntries(versions.map(version => [version, checksums[version]]))
}
