import { Link, createFileRoute } from "@tanstack/react-router"
import {
  BookOpen,
  Building2,
  Code,
  CodeXml,
  Cog,
  FileJson2,
  GitBranch,
  Github,
  ListChecks,
  Rocket,
  ScrollText,
  Waypoints,
} from "lucide-react"
import type { ReactNode } from "react"
import { BackToTop } from "livemark/components/BackToTop"
import { Banner } from "livemark/components/Banner"
import { Header } from "livemark/components/Header"
import {
  Datist,
  FeatureGrid,
  FinalCta,
  Hero,
  Highlight,
  LandingSection,
  type Point,
  ShowcaseSection,
  type Slide,
  SplitSection,
  WindowCard,
  actionClass,
  textLinkClass,
  tk,
} from "../components/Landing.tsx"
import {
  Code as CodeLines,
  WindowCode,
  carSample,
  consumeSample,
  datasetSample,
  dealerSample,
  facilitySample,
  profileSample,
  publishSample,
  tableSchemaSample,
} from "../components/Samples.tsx"

// @ts-ignore
export const Route = createFileRoute("/")({
  component: Landing,
})

function Landing() {
  return (
    <>
      <Banner />
      <Header />
      <main className="flex flex-col">
        <Hero
          eyebrow="Technical preview · MIT License"
          title={
            <>
              Data exchange format for <Highlight>car dealerships</Highlight>
            </>
          }
          lede={
            <>
              Share dealers, facilities and car listings in one JSON file — a{" "}
              <code className="font-mono text-foreground">Fairspec</code> dataset with
              typed tables, shipped with TypeScript, Python and Rust libraries.
            </>
          }
          actions={
            <>
              <Link
                to="/$"
                params={{ _splat: "overview" }}
                className={actionClass("default")}
              >
                <Rocket className="size-4" />
                Get started
              </Link>
              <a
                href="https://github.com/datisthq/cardealer"
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass("outline")}
              >
                <Github className="size-4" />
                View source
              </a>
            </>
          }
          slides={slides}
        />
        <SplitSection
          title="A simple format for car listings"
          lede="One file a dealership publishes and any marketplace or aggregator can read."
          points={standardPoints}
          visual={
            <WindowCard label="dataset.json">
              <WindowCode code={datasetSample} />
            </WindowCard>
          }
          links={
            <>
              <Link
                to="/$"
                params={{ _splat: "specification/data" }}
                className={textLinkClass}
              >
                Read the specification →
              </Link>
              <Link to="/$" params={{ _splat: "examples" }} className={textLinkClass}>
                Browse the examples →
              </Link>
            </>
          }
        />
        <LandingSection
          title="Libraries for every stack"
          lede="Three hand-written twins on the Fairspec base libraries, kept equal by one conformance suite."
        >
          <FeatureGrid features={tools} />
        </LandingSection>
        <ShowcaseSection
          title="Write in one language. Read in another."
          lede="A dataset published from TypeScript validates the same way in Python and Rust."
          left={{ label: "publish.ts", content: <WindowCode code={publishSample} /> }}
          right={{ label: "consume.py", content: <WindowCode code={consumeSample} /> }}
        />
        <FinalCta
          title={
            <>
              Publish your listings.{" "}
              <span className="text-primary">Start with one JSON file.</span>
            </>
          }
          lede="Read the format, drop in an example, and have your dealer feed shareable in minutes."
          actions={
            <>
              <Link
                to="/$"
                params={{ _splat: "overview" }}
                className={actionClass("default")}
              >
                <BookOpen className="size-4" />
                Read the docs
              </Link>
              <Link
                to="/$"
                params={{ _splat: "examples" }}
                className={actionClass("ghost")}
              >
                <FileJson2 className="size-4" />
                Browse examples
              </Link>
            </>
          }
        />
        <Datist />
      </main>
      <BackToTop />
    </>
  )
}

/* ─────────────────────────── Hero ─────────────────────────── */

const slides: Slide[] = [
  {
    id: "dataset",
    title: "Dataset",
    content: <SpecPreview />,
    source: {
      eyebrow: "Checked by a profile",
      file: "$schema",
      code: (
        <span className={tk.url}>
          {"datisthq.github.io/cardealer/\nprofiles/latest/dataset.json"}
        </span>
      ),
    },
  },
  {
    id: "dealer",
    title: "Dealer",
    content: <SlideCode code={dealerSample} />,
    source: {
      eyebrow: "Exactly one dealer",
      file: "schemas/latest/dealer.json",
      code: <>title · address · phone · url</>,
    },
  },
  {
    id: "facility",
    title: "Facility",
    content: <SlideCode code={facilitySample} />,
    source: {
      eyebrow: "Five facility types",
      file: "schemas/latest/facility.json",
      code: <>{"showroom · service · warehouse\ndelivery · office"}</>,
    },
  },
  {
    id: "car",
    title: "Car",
    content: <SlideCode code={carSample} />,
    source: {
      eyebrow: "Linked by foreign key",
      file: "schemas/latest/car.json",
      code: <CodeLines code={`"facilityId": "downtown-sf"`} />,
    },
  },
]

/* ─────────────────────────── Standard ─────────────────────────── */

const standardPoints: Point[] = [
  {
    icon: FileJson2,
    title: "One file",
    description:
      "Dealer, facilities and cars travel together in a single JSON dataset any consumer can read out of the box.",
  },
  {
    icon: Building2,
    title: "Multi-location",
    description:
      "Showrooms, service centers, warehouses, delivery points and offices, with cars linked to the facility that holds them.",
  },
  {
    icon: BookOpen,
    title: "Built on Fairspec",
    description:
      "Every cardealer dataset is also a valid Fairspec dataset, validated by JSON Schema Draft 2020-12.",
  },
  {
    icon: GitBranch,
    title: "Versioned",
    description:
      "Published profiles and schemas never change; each release gets its own immutable URL.",
  },
]

/* ─────────────────────────── Tools ─────────────────────────── */

const tools: Point[] = [
  {
    icon: CodeXml,
    title: "TypeScript",
    description: "Zod models extending @fairspec/metadata to parse and publish datasets.",
    link: { to: "/$", splat: "software/typescript" },
  },
  {
    icon: Code,
    title: "Python",
    description:
      "Pydantic models subclassing fairspec-metadata to validate and write datasets.",
    link: { to: "/$", splat: "software/python" },
  },
  {
    icon: Cog,
    title: "Rust",
    description: "Serde models parsing through fairspec-metadata to read datasets.",
    link: { to: "/$", splat: "software/rust" },
  },
  {
    icon: ListChecks,
    title: "Conformance",
    description:
      "Language-neutral JSON cases every library runs, so the three never drift apart.",
  },
  {
    icon: Waypoints,
    title: "Profiles and schemas",
    description:
      "The dataset profile and the dealer, facility and car table schemas, served from this site.",
    link: { to: "/$", splat: "specification/data" },
  },
  {
    icon: ScrollText,
    title: "Specification",
    description: "Normative prose for the metadata and every table, field by field.",
    link: { to: "/$", splat: "specification/metadata" },
  },
]

/* ─────────────────────────── Samples ─────────────────────────── */

function SlideCode(props: { code: string }) {
  return (
    <WindowCode
      code={props.code}
      className="px-3 py-4 text-[10.5px] sm:p-5 sm:text-sm xl:px-8 xl:py-6"
    />
  )
}

function SpecPreview() {
  return (
    <div className="space-y-3 px-3 py-4 font-mono text-[10.5px] leading-relaxed sm:p-5 sm:text-sm xl:p-8 xl:text-base">
      <SpecLabel>A Fairspec dataset with three resources</SpecLabel>
      <pre className="overflow-x-auto">
        <CodeLines code={profileSample} />
      </pre>
      <SpecLabel>Each resource is a typed table</SpecLabel>
      <pre className="overflow-x-auto">
        <CodeLines code={tableSchemaSample} />
      </pre>
    </div>
  )
}

function SpecLabel(props: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground">
      {props.children}
    </div>
  )
}
