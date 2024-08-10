<template>

  <div class="table-wrapper">

    <div class="sufusku-header">
      <img class="sufusku" src="../assets/sufusku.png" alt="sufusku" />
      &nbsp;
      <CButton :disabled="store.locked()" color="primary" @click="store.lock()">Lock</CButton>
      &nbsp;
      <CButton color="primary" @click="reset()">Reset</CButton>
    </div>
    <CTable>
      <CTableBody>
        <template v-for="row in 3" v-bind:key="row">
          <CTableRow>
            <template v-for="col in 3" v-bind:key="store.cells[(row-1)*3+col-1].id">
              <CTableDataCell>
                <Section class="cell" :sectionCells="store.sections[(row-1)*3+col-1]" />
              </CTableDataCell>
            </template>
          </CTableRow>
        </template>
      </CTableBody>
    </CTable>
  </div>

  <div class="instructions">
    <a href="#" @click="showInstructions = true">Instructions</a>
  </div>

  <CModal :backdrop="false" :keyboard="false" :visible="showReset">
    <CModalHeader>
      <CModalTitle>Really?</CModalTitle>
    </CModalHeader>
    <CModalBody>Are you sure you want to reset the current game?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="showReset = false">Cancel</CButton>
      <CButton color="primary" @click="confirmReset">Reset</CButton>
    </CModalFooter>
  </CModal>

  <CModal size="xl" alignment="center" :backdrop="true" :keyboard="false" :visible="showInstructions"
          @close="showInstructions = false">
    <CModalHeader>
      <CModalTitle>Instructions</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <ol>
        <li>
          <div>Add the original numbers and click on the lock button. That would set the baseline of your sudoku.</div>
          <img src="../assets/locked.png" alt="locked board" class="instructions-img" />
        </li>
        <li>
          <div>Start adding missing numbers. The numbers beneath each cell tells you which values are available.</div>
          <img src="../assets/available.png" alt="available values" class="instructions-img" />
        </li>
        <li>Pay attention to the cell colors:
          <ol class="secondary">
            <li>A locked cell which cannot be changed <img src="../assets/locked-cell.png" alt="locked cell"
                                                           class="instructions-single-img" /></li>
            <li>A cells with a legal value <img src="../assets/filled-cell.png" alt="locked cell"
                                                class="instructions-single-img" /></li>
            <li>A cell with a single available value <img src="../assets/single-cell.png" alt="locked cell"
                                                          class="instructions-single-img" /></li>
            <li>Two cells with the same value <img src="../assets/dup-cells.png" alt="locked cell"
                                                   class="instructions-double-img" /></li>
          </ol>
        </li>
      </ol>
    </CModalBody>
  </CModal>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Section from '@/components/Section.vue'
import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/vue/dist/esm/components/table'
import { useCellDataStore } from '@/components/CellDataStore'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/vue/dist/esm/components/modal'

const store = useCellDataStore()
const showReset = ref<boolean>(false)
const showInstructions = ref<boolean>(false)

store.reset()

const reset = () => {
  showReset.value = true
}

const confirmReset = () => {
  store.reset()
  showReset.value = false
}

</script>

<style scoped>

img.sufusku {
  width: 300px;
}

.sufusku-header {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  white-space: nowrap;
}

.table-wrapper {
  width: 40%;
  display: block;

  text-align: center;
}

@media only screen and (min-width: 1025px) {
  .table-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
}

table {
  padding: 0;
  margin: 0;
  border-width: 0;
}

td {
  padding: 0 15px 0 0;
  border-width: 0;
}

tr {
  border-width: 0;
}

.instructions {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 20px;
}

img.instructions-img {
  width: 200px;
  padding-top: 10px;
}

img.instructions-single-img {
  width: 50px;
  padding-top: 10px;
}

img.instructions-double-img {
  width: 100px;
  padding-top: 10px;
}

li {
  padding-top: 10px;
  text-align: left;
}

ol.secondary {
  list-style-type: lower-alpha;
}
</style>
