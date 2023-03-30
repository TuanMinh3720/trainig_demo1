<template>
  <div class="flex h-10% w-full">
    <n-space class="w-15%" vertical>
      <n-select v-model:value="selectRef" :options="options1" />
    </n-space>
    <input v-model="inputData" placeholder="Enter URL" />
    <button @click="getApi">Send</button>
  </div>
  <div v-if="responseData">
    <h3>Response Data:</h3>
    <pre>{{ JSON.stringify(responseData, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue"

const selectRef = ref("GET")
const inputData = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/Minhh")
const responseData = ref(null)

const getApi = async () => {
  switch (selectRef.value) {
    case "GET":
      console.log("get Api")
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
  console.log("🚀 ~ file: test.vue:49 ~ getApi ~ handleGet:", handleGet)
}

const options1 = [
  {
    label: "GET",
    value: "GET",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "PUT",
    value: "PUT",
  },

  {
    label: "DELETE",
    value: "DELETE",
  },
]

const handleGet = async () => {
  const { data, error, pending, refresh } = await useFetch(inputData.value, {
    method: "GET",
  })
  responseData.value = data.value
}

const handlePost = async () => {
  const { data, error, pending, refresh } = await useFetch(inputData.value, {
    method: "POST",
    body: {
      requestId: "1233444",
      items: "hello",
      count: "1",
      anyKey: "any",
    },
  })
  responseData.value = data.value
}
const handlePut = async () => {
  const { data, error, pending, refresh } = await useFetch(inputData.value, {
    method: "PUT",
    body: {
      requestId: "minhhhh",
      items: "Duong Tuan Minh",
      count: "2",
      anyKey: "mmmmm",
    },
  })
  responseData.value = data.value
  console.log("🚀 ~ file: test.vue:93 ~ handlePut ~ handlePut:", handlePut)
}
const handleDelete = async () => {
  const { data, error, pending, refresh } = await useFetch(inputData.value, {
    method: "DELETE",
  })
  responseData.value = data.value
  console.log("🚀 ~ file: test.vue:106 ~ handleDelete ~ handleDelete:", handleDelete)
}
</script>
