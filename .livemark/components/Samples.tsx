import type { ReactNode } from "react"
import { cn } from "cn"
import { tk } from "./Landing.tsx"

/** A code window body, highlighted with the site's token colours. */
export function WindowCode(props: { code: string; className?: string }) {
  return (
    <pre
      className={cn(
        "p-5 text-sm leading-relaxed font-mono overflow-x-auto",
        props.className,
      )}
    >
      <Code code={props.code} />
    </pre>
  )
}

/** Highlights JSON, TypeScript, Python or Rust well enough for a landing sample. */
export function Code(props: { code: string }) {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of props.code.matchAll(TOKEN)) {
    const [text, comment, string, number, word] = match
    const index = match.index
    if (index > last) nodes.push(props.code.slice(last, index))
    last = index + text.length
    const key = string !== undefined && /^\s*:/.test(props.code.slice(last))
    nodes.push(
      <span
        key={index}
        className={key ? tk.key : classify(text, { comment, string, number, word })}
      >
        {text}
      </span>,
    )
  }
  nodes.push(props.code.slice(last))
  return <code className={tk.body}>{nodes}</code>
}

export const datasetSample = `{
  "$schema": "https://datisthq.github.io/cardealer/profiles/latest/dataset.json",
  "resources": [
    {
      "name": "dealer",
      "tableSchema": "https://datisthq.github.io/cardealer/schemas/latest/dealer.json",
      "data": [
        {
          "title": "Premium Auto Sales",
          "country": "United States",
          "region": "California",
          "city": "Los Angeles",
          "address": "1234 Sunset Boulevard",
          "url": "https://www.premiumauto.com"
        }
      ]
    },
    {
      "name": "car",
      "tableSchema": "https://datisthq.github.io/cardealer/schemas/latest/car.json",
      "data": [
        {
          "title": "2023 Tesla Model 3 Long Range",
          "brand": "Tesla",
          "model": "Model 3",
          "year": 2023,
          "price": 45990,
          "currency": "USD"
        }
      ]
    }
  ]
}`

export const profileSample = `"$schema": "https://datisthq.github.io/cardealer/profiles/latest/dataset.json",
"resources": [
  { "name": "dealer", "data": [{ ... }] },
  { "name": "facility", "data": [{ ... }, { ... }] },
  { "name": "car", "data": [{ ... }, { ... }, { ... }] }
]`

export const tableSchemaSample = `"name": "car",
"tableSchema": "https://datisthq.github.io/cardealer/schemas/latest/car.json"`

export const dealerSample = `{
  "name": "dealer",
  "data": [
    {
      "title": "Elite Motors Group",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "address": "500 Market Street",
      "phone": "+1-415-555-0200",
      "url": "https://www.elitemotors.com",
      "lat": 37.7749,
      "lon": -122.4194
    }
  ]
}`

export const facilitySample = `{
  "name": "facility",
  "data": [
    {
      "id": "downtown-sf",
      "type": "showroom",
      "title": "Elite Motors - Downtown Showroom",
      "city": "San Francisco",
      "address": "500 Market Street"
    },
    {
      "id": "oakland-service",
      "type": "service",
      "title": "Elite Motors - Oakland Service Center",
      "city": "Oakland",
      "address": "800 Broadway"
    }
  ]
}`

export const carSample = `{
  "name": "car",
  "data": [
    {
      "facilityId": "downtown-sf",
      "title": "2022 BMW X5 xDrive40i",
      "brand": "BMW",
      "model": "X5",
      "year": 2022,
      "price": 62500,
      "currency": "USD",
      "mileage": 24500,
      "fuel": "petrol",
      "gearbox": "auto"
    }
  ]
}`

export const publishSample = `import { writeFile } from "node:fs/promises"
import { Dataset, VERSION } from "cardealer"

const dataset = Dataset.parse({
  $schema: \`https://datisthq.github.io/cardealer/profiles/\${VERSION}/dataset.json\`,
  resources: [
    {
      name: "dealer",
      tableSchema: \`https://datisthq.github.io/cardealer/schemas/\${VERSION}/dealer.json\`,
      data: [{ title: "Premium Auto Sales", city: "Los Angeles" }],
    },
  ],
})

await writeFile("dataset.json", JSON.stringify(dataset, null, 2))`

export const consumeSample = `import json

from cardealer import Dataset

with open("dataset.json") as file:
    dataset = Dataset.model_validate(json.load(file))

for resource in dataset.resources:
    print(resource.name)`

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\\n]|\\.)*"|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|[{}[\](),:;.=<>!?&|+\-*/]+/g

const KEYWORDS = new Set([
  "as",
  "await",
  "const",
  "def",
  "false",
  "fn",
  "for",
  "from",
  "import",
  "in",
  "let",
  "null",
  "true",
  "with",
])

function classify(
  text: string,
  groups: { comment?: string; string?: string; number?: string; word?: string },
) {
  if (groups.comment) return tk.dim
  if (groups.string) return text.includes("https://") ? tk.url : tk.str
  if (groups.number) return tk.num
  if (groups.word) {
    if (KEYWORDS.has(text)) return tk.cmd
    if (/^[A-Z]/.test(text)) return tk.key
    return tk.body
  }
  return tk.punct
}
