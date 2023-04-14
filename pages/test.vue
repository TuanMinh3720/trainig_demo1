<template>
  <div class="w-full flex">
    <div class="w-1/2">
      <div class="ml-5 flex items-center">
        <n-space class="w-15%" vertical>
          <n-select v-model:value="selectRef" :options="options1" />
        </n-space>
        <input v-model="inputData" placeholder="Enter URL or paste text" class="h-7 w-80% border" />
        <div class="flex items-center ml-2 mr-2">
          <n-button @click="getApi" class="h-8.5" color="blue">Send</n-button>
          <div class="bg-#0000FF h-8.5"></div>
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <h2 class="ml-5 text-truegray">Reponse</h2>
      <img v-if="showImage" src="./Postman.png" alt="Postman logo" class="ml-40 mt-40" />
      <div v-if="responseData">
        <n-config-provider :hljs="hljs">
          <n-code :code="JSON.stringify(responseData, null, 2)" language="json" />
        </n-config-provider>
      </div>
      <div v-if="errorMsg" class="text-red-500 text-xl">
        <p>"{{ errorMsg }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import axios from "axios"
import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"

hljs.registerLanguage("json", json)

const selectRef = ref("GET")
const inputData = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/Minhh")
const responseData = ref(null)
const errorMsg = ref("")
const showImage = ref(true)

const isValidUrl = (url) => {
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i
  return urlPattern.test(url)
}

const getApi = async () => {
  if (!isValidUrl(inputData.value)) {
    errorMsg.value = "URL không đúng định dạng"
    responseData.value = null
    return
  } else {
    errorMsg.value = null
  }
  switch (selectRef.value) {
    case "GET":
      await handleGet()
      break
    case "POST":
      console.log("post api")
      await handlePost()
      break
    case "PUT":
      console.log("put api")
      await handlePut()
      break
    case "DELETE":
      console.log("delete api")
      await handleDelete()
      break
  }
}

const handleGet = async () => {
  try {
    const response = await axios.get(inputData.value)
    responseData.value = response.data
    showImage.value = false
    hljs.highlightAll()
  } catch (error) {
    errorMsg.value = error.message
    responseData.value = null
  }
}

const handlePost = async () => {
  try {
    const response = await axios.post(inputData.value, {})
    responseData.value = response.data
    hljs.highlightAll()
  } catch (error) {
    errorMsg.value = error.message
    responseData.value = null
  }
}

const handlePut = async () => {
  try {
    const response = await axios.put(inputData.value, {})
    responseData.value = response.data
    hljs.highlightAll()
  } catch (error) {
    errorMsg.value = error.message
    responseData.value = null
  }
}

const handleDelete = async () => {
  try {
    const response = await axios.delete(inputData.value)
    responseData.value = response.data
    hljs.highlightAll()
  } catch (error) {
    errorMsg.value = error.message
    responseData.value = null
  }
}

watch(
  () => selectRef.value,
  () => {
    responseData.value = null
    errorMsg.value = null
  },
)

watch(
  () => inputData.value,
  () => {
    responseData.value = null
    errorMsg.value = null
  },
)
</script>
