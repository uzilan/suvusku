import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CellData } from '@/model/CellData'

export const useCellDataStore = defineStore('cellDataStore', {
  state: () => ({
    cells: ref<CellData[]>([])
  }),
  actions: {
    cellChanged: function() {
      const row = (rowIndex: number) => this.cells.filter(cell => cell.row === rowIndex)
      const col = (colIndex: number) => this.cells.filter(cell => cell.col === colIndex)
      const section = (sectionIndex: number) => this.cells.filter(cell => cell.section === sectionIndex)
      const sus = (cellData: CellData) => new Set(row(cellData.row).concat(col(cellData.col)).concat(section(cellData.section)))
      const dups = (cellData: CellData) => {
        const same = [...sus(cellData)].filter(c => c.value === cellData.value)
        return same?.length > 1
      }

      const avails = (cellData: CellData): number[] => {
        const all = [...Array(10).keys()].slice(1)
        const used = new Set([...sus(cellData)].map(cell => cell.value))
        return all.filter(value => !used.has(value))
      }

      this.cells.forEach(cell => {
        const d = dups(cell)
        cell.class = !cell.value ? 'white' : d ? 'red' : 'green'
        cell.poss = avails(cell)
      })
    }
  }
})
