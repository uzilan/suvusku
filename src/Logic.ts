import type { CellData } from '@/model/CellData'

export const updateCells = (cells: CellData[], lockedCellIds: string[], updated: CellData | undefined = undefined) => {
  const row = (rowIndex: number) => cells.filter(cell => cell.row === rowIndex)
  const col = (colIndex: number) => cells.filter(cell => cell.col === colIndex)
  const section = (sectionIndex: number) => cells.filter(cell => cell.section === sectionIndex)
  const sus = (cellData: CellData) => new Set(row(cellData.row).concat(col(cellData.col)).concat(section(cellData.section)))
  const dups = (cellData: CellData) => {
    const same = [...sus(cellData)].filter(c => c.value === cellData.value)
    return same?.length > 1
  }

  const avails = (cellData: CellData): number[] => {
    const all = [...Array(10).keys()].slice(1)
    const used = new Set([...sus(cellData)]
      .map(cell => Number(cell.value))
      .filter(value => value !== 0))

    return all.filter(value => !used.has(value))
  }

  const cellColor = (cell: CellData) => {
    if (lockedCellIds.includes(cell.id)) return 'locked'
    if (!cell.value) {
      if (cell.poss.length === 1) return 'blue'
      return 'white'
    }
    if (dups(cell)) return 'red'
    return 'green'
  }

  const cellUpdated = (cell: CellData) => {
    if (!updated || updated.id !== cell.id)
      return ''

    return ' updated !important'
  }

  cells.forEach(cell => {
    cell.poss = cell.value ? [cell.value] : avails(cell)
    cell.class = cellColor(cell) + cellUpdated(cell)
  })
}
