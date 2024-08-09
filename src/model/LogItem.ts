import { DateTime } from 'luxon'
import type { CellData } from '@/model/CellData'

export interface LogItem {
  timestamp: DateTime
  state: CellData[]
  cellId: string
}
