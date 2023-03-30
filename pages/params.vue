<template>
  <n-layout>
    <n-layout-header>
      <div class="flex justify-between items-center">
        <p class="flex items-center">
          <Nuxt-link to="/" class="text-gray-400 font-normal mr-1 decoration-none"
            >New Collection /</Nuxt-link
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
          <n-select v-model:value="selectRef" :options="options1" />
        </n-space>
        <input
          placeholder="Enter URL or paste text"
          v-model="inputData"
          class="bg-gray-100 focus:bg-white h-7 w-80%"
        />

        <div class="flex items-center ml-2 mr-2">
          <n-button class="h-8.5" color="blue" @click="getApi">Send</n-button>
          <div class="bg-#0000FF h-8.5">
            <n-dropdown placement="bottom-start" trigger="click" :options="options2">
              <div class="i-mdi:chevron-down bg-white text-xl"></div>
            </n-dropdown>
          </div>
        </div>
      </div>
      <hr class="opacity-50" />
    </n-layout-content>
    <n-layout-footer class=" ">
      <n-card>
        <n-tabs type="line" animated>
          <n-tab-pane tab="Params">
            <div class="flex w-full divide-x">
              <div class="w-1/2 h-screen">
                <div class="flex items-center">
                  <p class="font-bold">Query Param</p>
                </div>

                <n-table>
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
              <div class="bg-white w-1/2 h-screen">
                <div v-if="responseData">
                  <h3>Response Data:</h3>
                  <pre>{{ JSON.stringify(responseData, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </n-tab-pane>
          <n-tab-pane name="the beatles" tab="Headers">
            <div class="flex w-full divide-x">
              <div class="h-screen w-1/2">
                <div class="flex items-center">
                  <p class="font-600">Headers</p>
                  <n-button class="ml-5 bg-gray-1 p-1 rounded-lg h-5 text-sm" @click="toggleTable">
                    <i v-if="!showTable" class="i-mdi:eye"></i>
                    <i v-if="showTable" class="i-mdi:eye-off"></i>
                    {{ buttonText }}
                  </n-button>
                </div>

                <div>
                  <n-table v-if="!showTable">
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
                  <n-table v-if="showTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div class="i-mdi:chevron-down-box-outline text-2xl"></div>
                        </td>
                        <td>Postman-Token</td>
                        <td>calculated when request is sent</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <div class="i-mdi:chevron-down-box text-2xl"></div>
                        </td>
                        <td>Host</td>
                        <td>calculated when request is sent</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <div class="i-mdi:chevron-down-box text-2xl"></div>
                        </td>
                        <td>User-Agent</td>
                        <td>PostmanRuntime/7.31.3</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td><div class="i-mdi:chevron-down-box text-2xl"></div></td>
                        <td>Accept</td>
                        <td>*/*</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td><div class="i-mdi:chevron-down-box text-2xl"></div></td>
                        <td>Accept-Encoding</td>
                        <td>gzip, deflate, br</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td><div class="i-mdi:chevron-down-box text-2xl"></div></td>
                        <td>Connection</td>
                        <td>keep-alive</td>
                        <td></td>
                      </tr>
                    </tbody>
                    <tbody class="w-full">
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
              <div class="bg-white w-1/2 h-screen">
                <h2 class="ml-5 text-truegray">Reponse</h2>
                <img class="mt-30% ml-30%" src="./Postman11.png" alt="" />
              </div>
            </div>
          </n-tab-pane>
          <n-tab-pane name="jay chou" tab="Body">
            <div class="flex w-full divide-x">
              <div class="h-screen w-1/2">
                <div class="flex items-center">
                  <div class="flex bg-gray-100 border border-gray-300 rounded p-1 mr-4">
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
              </div>
              <div class="bg-white w-1/2 h-screen">
                <h2 class="ml-5 text-truegray">Reponse</h2>
                <img class="mt-30% ml-30%" src="./Postman11.png" alt="" />
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-layout-footer>
  </n-layout>
</template>
<script setup>
import { ref, watch, onMounted } from "vue"
const items = ref([])

const boxs = ref([])
const showTable = ref(false)
const toggleCount = ref(0)

const newVariable = ref("")
const newInitialValue = ref("")
const newCurrentValue = ref("")
const toggleTable = () => {
  toggleCount.value++
  showTable.value = toggleCount.value % 2 === 1
}

const buttonText = computed(() => {
  return toggleCount.value % 2 === 0 ? "6 hidden" : "Hide auto-generated headers"
})

const addNewRow = (index) => {
  if (newVariable.value.trim() !== "") {
    boxs.value.splice(index + 1, 0, {
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
    })

    newVariable.value = ""
    newInitialValue.value = ""
    newCurrentValue.value = ""
  }
  if (newInitialValue.value.trim() !== "") {
    boxs.value.splice(index + 1, 0, {
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
    })
    newVariable.value = ""
    newInitialValue.value = ""
    newCurrentValue.value = ""
  }
  if (newCurrentValue.value.trim() !== "") {
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

watch(boxs, (newboxs) => {
  console.log(newboxs)
})

onMounted(() => {
  console.log("Table mounted")
})
const options = [
  {
    label: "Save as...",
  },
]

const selectRef = ref("GET")
const inputData = ref("")
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
      break

    case "DELETE":
      console.log("delete api")
      break

    default:
      break
  }
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
    label: "PATCH",
    value: "PATCH",
  },
  {
    label: "DELETE",
    value: "DELETE",
  },
]
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
const handleGet = async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  const data = await response.json()
  responseData.value = data
  console.log(data)
}

const handlePost = async () => {
  const { data, error, pending, refresh } = await useFetch("https://fakestoreapi.com/products", {
    method: "POST",

    body: {
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    },
  })
  console.log("🚀 ~ file: detail.vue:373 ~ handlePost ~ data:", data)
}
</script>
