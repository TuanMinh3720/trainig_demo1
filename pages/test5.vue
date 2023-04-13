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
          <div class="bg-#0000FF h-8.5">
            <n-dropdown placement="bottom-start" trigger="click" :options="options2">
              <div class="i-mdi:chevron-down bg-white text-xl"></div>
            </n-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <div v-if="responseData">
        <h2 class="ml-5 text-truegray">Reponse</h2>
        <pre>{{ JSON.stringify(responseData, null, 2) }}</pre>
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
const selectRef = ref("GET")
const inputData = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/Minhh")
const responseData = ref(null)
const errorMsg = ref("")
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
      await handleDelete()
      console.log("delete api")
      break
    default:
      break
  }
}
const options1 = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
]
const handleGet = async () => {
  try {
    const response = await axios.get(inputData.value)
    responseData.value = response.data
    errorMsg.value = null
  } catch (error) {
    if (error.response) {
      responseData.value = error.response
    } else {
      
      errorMsg.value = "Đã xảy ra lỗi trong quá trình gửi yêu cầu"
      responseData.value = null
    }
  }
}

const handlePost = async () => {
  try {
    const data = inputValue.value ? JSON.parse(inputValue.value) : null
    const response = await axios.post(inputData.value, data)
    responseData.value = response.data
  } catch (error) {
    console.error(error)
    if (error.response) {
      errorMsg.value = error.response
      responseData.value = null
    } else {
      console.error(error)
      errorMsg.value = "Đã xảy ra lỗi trong quá trình gửi yêu cầu"
      responseData.value = null
    }
  }
}
const handlePut = async () => {
  try {
    const data = inputValue.value ? JSON.parse(inputValue.value) : null
    const response = await axios.put(inputData.value, data)
    responseData.value = response.data
  } catch (error) {
    console.error(error)
    if (error.response) {
      errorMsg.value = error.response
      responseData.value = null
    } else {
      console.error(error)
      errorMsg.value = "Đã xảy ra lỗi trong quá trình gửi yêu cầu"
      responseData.value = null
    }
  }
}

const handleDelete = async () => {
  try {
    const response = await axios.delete(inputData.value)
    responseData.value = response.data
  } catch (error) {
    console.error(error)
    if (error.response) {
      errorMsg.value = error.response
      responseData.value = null
    } else {
      console.error(error)
      errorMsg.value = "Đã xảy ra lỗi trong quá trình gửi yêu cầu"
      responseData.value = null
    }
  }
}
function isValidUrl(url) {
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i
  return urlPattern.test(url)
}
</script>
