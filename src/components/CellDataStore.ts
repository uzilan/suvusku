import { defineStore } from 'pinia'
import { ref } from 'vue'

import { DateTime } from 'luxon'
import { updateCells } from '@/Logic'
import { groupBy } from '@/Utils'
import { CellData } from '@/model/CellData'

export const useCellDataStore = defineStore('cellDataStore', {
  state: () => ({
    cells: ref<CellData[]>([]),
    sections: ref<any[]>([]),
    lockedCellIds: ref<string[]>([])
  }),
  actions: {
    cell: function(id: string) {
      return this.cells.find(cell => cell.id === id)
    },
    cellChanged: function(updated: CellData) {
      updateCells(this.cells, this.lockedCellIds, updated)
    },
    lock: function() {
      this.lockedCellIds = this.cells
        .filter(cell => cell.value)
        .map(cell => cell.id)
      updateCells(this.cells, this.lockedCellIds)
    },
    locked: function() {
      return this.lockedCellIds.length > 0
    },
    reset: function() {
      this.cells = []
      this.lockedCellIds = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
          const cellData = new CellData(0, rowIndex, colIndex)
          this.cells.push(cellData)
        }
      }

      this.sections = groupBy(this.cells, 'section')
    }
  }
})
