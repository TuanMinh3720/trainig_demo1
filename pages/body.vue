<template>
  <n-layout>
    <n-layout-header>
      <div class="flex justify-between items-center">
        <p class="flex items-center">
          <nuxt-link to="/" class="text-gray-400 font-normal mr-1 decoration-none"
            >New Collection /</nuxt-link
          >
          <span class="text-gray-400 font-normal mr-1">New Folder / </span>
          <span class="text-black font-bold">New Request</span>
        </p>
        <div class="flex items-center">
          <div class="flex bg-gray-100 border border-gray-300 rounded p-1 mr-4">
            <div class="flex items-center mr-1">
              <div class="i-mdi:content-save-outline text-xl"></div>
              <div class="cursor-pointer ml-1">Save</div>
            </div>
            <n-dropdown placement="bottom-start" trigger="click" size="small" :options="options">
              <div class="i-mdi:chevron-down text-xl"></div>
            </n-dropdown>
          </div>
          <n-dropdown placement="bottom-start" trigger="click" size="small" :options="options3">
            <div class="i-mdi:dots-horizontal text-xl"></div>
          </n-dropdown>

          <div class="flex items-center bg-gray-1 p-1 rounded-lg h-7 ml-8">
            <div class="relative bg-white p-1 rounded-sm">
              <div class="i-mdi:pencil text-xl bg-orange"></div>
            </div>
            <div class="i-mdi:comment-text-outline text-xl ml-2"></div>
          </div>
        </div>
      </div>
      <hr class="opacity-50" />
      <Header />
    </n-layout-header>
    <n-layout-content content-style="">
      <div class="flex items-center">
        <n-space class="w-15%" vertical>
          <n-select v-model="value" :options="options1" />
        </n-space>
        <n-input placeholder="Enter URL or paste text" class="bg-gray-100 focus:bg-white h-8.5"></n-input>
        <div class="flex items-center ml-2 mr-2">
          <n-button class="h-8.5" color="blue">Send</n-button>
          <div class="bg-#0000FF h-8.5">
            <n-dropdown placement="bottom-start" trigger="click" :options="options2">
              <div class="i-mdi:chevron-down bg-white text-xl"></div>
            </n-dropdown>
          </div>
        </div>
      </div>
      <hr class="opacity-50" />
    </n-layout-content>
    <n-layout-footer class="h-screen relative bg-white">
      <div class="flex w-full divide-x">
        <div class="h-screen w-1/2">
          <div class="flex justify-between items-center">
            <div class="flex">
              <NuxtLink to="/params" class="mr-5 decoration-none text-black font-100">Params</NuxtLink>
              <NuxtLink to="/headers" class="mr-5 decoration-none text-black font-100">Headers</NuxtLink>
              <div class="mr-5 cursor-pointer text-green-500 font-100">
                Body <span class="absolute bottom-152 left-32 h-0.5 w-3% bg-red-500 underline"></span>
              </div>
            </div>
            <p class="text-blue-500 font-bold mr-5">Cookies</p>
          </div>
          <div class="flex items-center">
            <div class="flex w-10% bg-gray-100 border border-gray-300 rounded p-1 mr-4">
              <div class="flex items-center mr-1">
                <div class="cursor-pointer ml-1">raw</div>
              </div>
              <n-dropdown placement="bottom-start" trigger="click" size="small" :options="options4">
                <div class="i-mdi:chevron-down text-xl"></div>
              </n-dropdown>
            </div>
            <p class="text-blue-500 font-500">JSON</p>
            <n-dropdown placement="bottom-start" trigger="click" size="small" :options="options5">
              <div class="i-mdi:chevron-down text-xl"></div>
            </n-dropdown>
          </div>
          <!-- table -->
          <n-table class="w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <input class="w120" type="text" v-model="item.variable" @keydown.enter="addNewRow(index)" />
                </td>
              </tr>
              <tr>
                <td>{{ items.length + 1 }}</td>
                <td><input type="text" v-model="newVariable" @keydown.enter="addNewRow(items.length)" /></td>
              </tr>
            </tbody>
          </n-table>
        </div>
        <div class="bg-white w-1/2 h-screen">
          <h2 class="ml-5 text-truegray">Reponse</h2>
          <img class="mt-30% ml-30%" src="./Postman11.png" alt="" />
        </div>
      </div>
      <Footer />
    </n-layout-footer>
  </n-layout>
</template>
<script setup>
import { ref } from "vue"

const items = ref([])

const newVariable = ref("")
const newInitialValue = ref("")
const newCurrentValue = ref("")

function addNewRow(index) {
  if (newVariable.value.trim() !== "") {
    items.value.splice(index + 1, 0, {
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
    })
    newVariable.value = ""
    newInitialValue.value = ""
    newCurrentValue.value = ""
  }
}

const options = [
  {
    label: "Save as...",
  },
]

const options1 = [
  {
    label: "GET",
    value: "1",
  },
  {
    label: "POST",
    value: "2",
  },
  {
    label: "PUT",
    value: "3",
  },
  {
    label: "PATCH",
    value: "4",
  },
  {
    label: "DELETE",
    value: "5",
  },
]
const value = ref("1")

const options2 = [
  {
    label: "Send and Download",
  },
]
const options3 = [
  {
    label: "Add example",
  },
  {
    label: "Delete",
  },
]
const options4 = [
  {
    label: "none",
  },
  {
    label: "form-data",
  },
  {
    label: "x-www-form",
  },
  {
    label: "raw",
  },
  {
    label: "binary",
  },
  {
    label: "GrapQL",
  },
]
const options5 = [
  {
    label: "Text",
  },
  {
    label: "JavaScript",
  },
  {
    label: "JSON",
  },
  {
    label: "HTML",
  },
  {
    label: "XML",
  },
]
</script>
