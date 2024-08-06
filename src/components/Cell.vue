<template>
  <div class="cell">
    <input type="number" :id="cellData.id" :class="cellData.class" @keyup="checkClass()" v-model="value">
    <div class="possibles">
      {{cellData.poss.join('')}}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CellData } from '@/model/CellData'
import { useCellDataStore } from '@/components/CellDataStore'
import { ref } from 'vue'

const props = defineProps<{
  cellData: CellData
}>()

const store = useCellDataStore()
const value = ref<number>()

const checkClass = () => {
  const cell = store.cells.find(cell => cell.id === props.cellData.id)
  if (!cell) {
    return
  }

  cell.value = value.value
  store.cellChanged()
}

</script>

<style scoped>


.white {
  background-color: #fff;
}

.red {
  background-color: #f00;
}

.green {
  background-color: #0f0;
}

.blue {
  background-color: #00f;
}

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
