import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'

type DisposalItem = {
  id: string
  aliases: string[]
  verified_on: string
  source_ids: string[]
  primary_pathway: {
    next_action: string
    facility_ids?: string[]
  }
}

type DisposalData = {
  items: DisposalItem[]
  sources: { id: string; url: string }[]
  facilities: { id: string }[]
  clarification_groups: {
    id: string
    options: { item_id?: string; fallback?: string }[]
  }[]
  fallbacks: Record<string, unknown>
}

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dataPath = path.join(root, 'src/data/v1_disposal_data.json')
const schemaPath = path.join(root, 'src/data/v1_disposal_data.schema.json')

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as DisposalData
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

const ajv = new Ajv2020({ allErrors: true, strict: true })
const validate = ajv.compile(schema)

if (!validate(data)) {
  console.error('JSON Schema validation failed:')
  console.error(validate.errors)
  process.exit(1)
}

const failures: string[] = []
const ensureUnique = (values: string[], label: string) => {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) failures.push(`Duplicate ${label}: ${value}`)
    seen.add(value)
  }
}

if (data.items.length !== 25) failures.push(`Expected exactly 25 items; found ${data.items.length}`)

const sourceIds = new Set<string>(data.sources.map((source: { id: string }) => source.id))
const facilityIds = new Set<string>(data.facilities.map((facility: { id: string }) => facility.id))
const itemIds = new Set<string>(data.items.map((item: { id: string }) => item.id))

ensureUnique(data.sources.map((source: { id: string }) => source.id), 'source ID')
ensureUnique(data.facilities.map((facility: { id: string }) => facility.id), 'facility ID')
ensureUnique(data.items.map((item: { id: string }) => item.id), 'item ID')

const aliases: string[] = []
for (const item of data.items) {
  if (!item.primary_pathway?.next_action?.trim()) failures.push(`${item.id}: missing next action`)
  if (!item.verified_on?.trim()) failures.push(`${item.id}: missing verified_on`)
  if (!Array.isArray(item.source_ids) || item.source_ids.length === 0) failures.push(`${item.id}: missing source_ids`)

  for (const sourceId of item.source_ids) {
    if (!sourceIds.has(sourceId)) failures.push(`${item.id}: unknown source ${sourceId}`)
  }
  for (const facilityId of item.primary_pathway.facility_ids ?? []) {
    if (!facilityIds.has(facilityId)) failures.push(`${item.id}: unknown facility ${facilityId}`)
  }
  for (const alias of item.aliases) aliases.push(alias.trim().toLocaleLowerCase('en-US'))
}
ensureUnique(aliases, 'direct alias')

for (const group of data.clarification_groups) {
  for (const option of group.options) {
    if (option.item_id && !itemIds.has(option.item_id)) {
      failures.push(`${group.id}: unknown clarification item ${option.item_id}`)
    }
    if (option.fallback && !data.fallbacks[option.fallback]) {
      failures.push(`${group.id}: unknown fallback ${option.fallback}`)
    }
  }
}

for (const source of data.sources) {
  try {
    const parsed = new URL(source.url)
    if (parsed.protocol !== 'https:') failures.push(`${source.id}: source URL is not HTTPS`)
  } catch {
    failures.push(`${source.id}: malformed source URL`)
  }
}

if (failures.length > 0) {
  console.error('Data integrity validation failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Data validation passed: ${data.items.length} items, ${data.facilities.length} facilities, ${data.sources.length} sources.`)
