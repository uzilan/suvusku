<template>

  <div class="buttons">
    <img class="sufusku" src="../assets/sufusku.png" alt="sufusku" />
    &nbsp;
    <CButton :disabled="store.locked()" color="primary" @click="store.lock()">Lock</CButton>
    &nbsp;
    <CButton color="primary" @click="reset()">Reset</CButton>
  </div>

  <div class="table-wrapper">
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
  width: 30vw;
  padding-bottom: 30px;
}

.buttons {
  width: 80%;
  padding-bottom: 20px;
  display: contents;
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
