<template>
  <div class="log" id="scroll">
    <template v-for="logItem of store.log" v-bind:key="logItem.timestamp">
      <div class="log-item">
      <span class="timestamp">
      {{ logItem.timestamp.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
      </span>
        <a href="#" @click="store.changeState(logItem)">
          <div class="table-wrapper">
            <CTable class="log-table">
              <CTableBody>
                <template v-for="row in 9" v-bind:key="row">
                  <CTableRow>
                    <template v-for="col in 9" v-bind:key="cellAt(logItem, row, col).id">
                      <CTableDataCell :class="cellAt(logItem, row, col).class + ' ' + (store.currentLogItem?.timestamp === logItem.timestamp ? 'current' : '')">
                        {{ cellValue(logItem, row, col) }}
                      </CTableDataCell>
                    </template>
                  </CTableRow>
                </template>
              </CTableBody>
            </CTable>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useCellDataStore } from '@/components/CellDataStore'
import { CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/vue/dist/esm/components/table'
import type { LogItem } from '@/model/LogItem'
import { DateTime } from 'luxon'

const store = useCellDataStore()
const cellAt = (logItem: LogItem, row: number, col: number) => logItem.state[(row - 1) * 9 + col - 1]
const cellValue = (logItem: LogItem, row: number, col: number) => {
  const value = cellAt(logItem, row, col).value
  return value === 0 ? '\xa0' : value
}

const scroll = () => {
  const element = document.getElementById('scroll')
  if (element) {
    element.scrollTop = element.scrollHeight
  }
}

setInterval(scroll, 1000)

</script>

<style scoped>

a {
  text-decoration: none;
}
.log {
  height: 65vh;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
}

.log-table {
  margin-bottom: 0 !important;
}

.current {
  border: 1px solid red;
}

.log > div > div:last-child {
  scroll-snap-align: end;
}

.log-item {
  text-align: left;
}

.timestamp {
  font-size: 6pt;
}

.table-wrapper {
  text-align: center;
  width: 60% !important;
}

td {
  border: 1px solid gray;
  padding: 0;
  font-size: 6pt;
  width: 10px;
}

.updated {
  border: 2px solid purple;
}
</style>
