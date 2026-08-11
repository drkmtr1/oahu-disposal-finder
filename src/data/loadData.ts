import rawData from './v1_disposal_data.json'

export type DisposalData = typeof rawData

export function loadDisposalData(): DisposalData {
  return rawData
}
