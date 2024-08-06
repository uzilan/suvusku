<template>
  <img class="sufusku" src="../assets/sufusku.png" alt="sufusku" />
  <div class="table-wrapper">
    <CTable>
      <CTableBody>
        <template v-for="row in 3" v-bind:key="row">
          <CTableRow>
            <template v-for="col in 3" v-bind:key="store.cells[(row-1)*3+col-1].id">
              <CTableDataCell>
                <Section class="cell" :sectionCells="sections[(row-1)*3+col-1]" @cellChanged="cellChanged" />
              </CTableDataCell>
            </template>
          </CTableRow>
        </template>
      </CTableBody>
    </CTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CellData } from '@/model/CellData'
import Section from '@/components/Section.vue'
import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/vue/dist/esm/components/table'
import { useCellDataStore } from '@/components/CellDataStore'

const store = useCellDataStore()
const sections = ref<any[]>([])

const init = () => {
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cellData = new CellData(0, rowIndex, colIndex)
      store.cells.push(cellData)
    }
  }

  sections.value = Object.groupBy(store.cells, ({ section }) => section)
}

const cellChanged = () => {

}

init()

</script>

<style scoped>

img.sufusku {
  width: 70vh;
  padding-bottom: 20px;
}

.table-wrapper {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

table {
  padding: 0;
  margin: 0;
  border-width: 0;
}

td {
  padding: 0 15px 0 0;
}
</style>
