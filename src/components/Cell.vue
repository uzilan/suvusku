<template>
  <div class="cell">
    <input type="number" :id="cellData.id" :class="store.cell(cellData.id)?.class" @change="cellChanged"
           v-bind:value="store.cell(cellData.id)?.value === 0 ? ' ' : store.cell(cellData.id)?.value"
           :tabindex="cellData.row*9+cellData.col" :readonly="store.lockedCellIds.includes(cellData.id)">
    <div class="possibles">
      {{ cellData.poss.join('') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CellData } from '@/model/CellData'
import { useCellDataStore } from '@/components/CellDataStore'

const props = defineProps<{
  cellData: CellData
}>()

const store = useCellDataStore()

const cellChanged = (event: any) => {
  const cell = store.cell(props.cellData.id)
  if (!cell) {
    return
  }
  cell.value = event.target.value
  store.cellChanged(cell)
}

</script>

<style scoped>

.cell {
  height: 70px;
  width: 70px;
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

.possibles {
  font-size: 8px;
  text-align: center;
  padding-bottom: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number'] {
  width: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 20pt;
}

</style>
