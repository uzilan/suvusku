<template>
  <CTable>
    <CTableBody>
      <template v-for="row in 3" v-bind:key="row">
        <CTableRow>
          <template v-for="col in 3" v-bind:key="sectionCells[(row-1)*3+col-1].id">
            <CTableDataCell>
              <Cell class="cell" :cellData="sectionCells[(row-1)*3+col-1]" />
            </CTableDataCell>
          </template>
        </CTableRow>
      </template>
    </CTableBody>
  </CTable>
</template>

<script setup lang="ts">
import type { CellData } from '@/model/CellData'
import Cell from '@/components/Cell.vue'
import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/vue/dist/esm/components/table'

const props = defineProps<{
  sectionCells: CellData[]
}>()

</script>


<style scoped>

td {
  padding: 0;
  border-width: 0;
}

tr {
  border-width: 0;
}
</style>
