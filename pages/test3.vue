<template>
  <div>
    <div><input class="w-full" v-model="inputData" placeholder="Enter URL" /> <button>Send</button></div>
    <div>
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th></th>
            <th>Key</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(box, index) in boxs" :key="index">
            <td></td>
            <td>
              <input
                class="border-none"
                type="text"
                v-model="box.variable"
                @keydown.enter="addNewRow(index)"
              />
            </td>
            <td>
              <input
                class="border-none"
                type="text"
                v-model="box.initialValue"
                @keydown.enter="addNewRow(index)"
              />
            </td>
            <td>
              <input
                class="border-none"
                type="text"
                v-model="box.currentValue"
                @keydown.enter="addNewRow(index)"
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                class="border-none"
                placeholder="Key"
                type="text"
                v-model="newVariable"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
            <td>
              <input
                placeholder="Value"
                class="border-none"
                type="text"
                v-model="newInitialValue"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
            <td>
              <input
                placeholder="Description"
                class="border-none"
                type="text"
                v-model="newCurrentValue"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
const inputData = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/Minhh")
const newVariable = ref("")
const newInitialValue = ref("")
const newCurrentValue = ref("")
const boxs = ref([])
function addNewRow(index) {
  if (newVariable.value.trim() !== "" && newInitialValue.value.trim() !== "") {
    const url = new URL(inputData.value)
    const searchParams = url.searchParams
    searchParams.set(newVariable.value, newInitialValue.value)
    inputData.value = url.toString()
    boxs.value.splice(index + 1, 0, {
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
    })
    newVariable.value = ""
    newInitialValue.value = ""
    newCurrentValue.value = ""
  }
}
watch(inputData, (newUrl) => {
  const url = new URL(newUrl)
  const searchParams = url.searchParams
  const newBoxs = []

  for (const [variable, initialValue] of searchParams.entries()) {
    newBoxs.push({
      variable,
      initialValue,
      currentValue: "",
    })
  }

  boxs.value = newBoxs
})
</script>
