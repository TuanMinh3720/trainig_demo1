<template>
  <n-layout>
    <n-layout-header>
      <div class="flex justify-between items-center">
        <p class="flex items-center ml-5">
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

          <div class="flex items-center bg-gray-1 p-1 rounded-lg h-7 ml-8 mr-3">
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
      <div class="ml-5 flex items-center">
        <n-space class="w-15% p-1" vertical>
          <n-select v-model:value="selectRef" :options="options1" size="large" />
        </n-space>
        <n-input
          v-model:value="inputData"
          placeholder="Enter URL or paste text"
          class="border h-10 w-80% p-1"
        />
        <div class="w-12% flex items-center ml-2 mr-2 bg-blue-600 rounded-md h-10">
          <button @click="getApi" class="bg-blue-600 text-white border-none font-bold py-2 px-4 rounded-md">
            Send
          </button>
          <div class="bg-blue-600 rounded-md p-1">
            <n-dropdown placement="bottom-start" trigger="click" :options="options2">
              <div class="i-mdi:chevron-down bg-white"></div>
            </n-dropdown>
          </div>
        </div>
      </div>
      <hr class="opacity-50" />
    </n-layout-content>
    <n-layout-footer class=" ">
      <div class="flex w-full h-screen divide-x divide-gray-300">
        <div class="w2/3 bg-white">
          <n-card class="mt--2">
            <n-tabs type="line" animated>
              <n-tab-pane name="Params" tab="Params">
                <div>
                  <p class="font-bold mt-1">Query Params</p>
                </div>
                <div>
                  <n-table size="small" :bordered="true" :single-line="false">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Description</th>
                        <th class="w-full flex">
                          <div class="i-mdi:dots-horizontal text-xl"></div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(param, index) in params" :key="index">
                        <td>
                          <input type="checkbox" v-model="param.checked" @change="toggleEnabled(index)" />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="param.key"
                            placeholder="Key"
                            @input="handleInput(index)"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="param.value"
                            placeholder="Value"
                            @input="handleInput(index)"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            v-model="param.description"
                            placeholder="Description"
                            @input="handleInput(index)"
                          />
                        </td>
                        <td>
                          <div @click="removeParam(index)" class="i-mdi:trash-can-outline text-xl"></div>
                        </td>
                      </tr>
                    </tbody>
                  </n-table>
                </div>
              </n-tab-pane>
              <n-tab-pane name="the beatles" tab="Headers">
                <div class="flex items-center">
                  <p class="font-600">Headers</p>
                  <n-button class="ml-5 bg-gray-1 p-1 rounded-lg h-5 text-sm" @click="toggleTable">
                    <i v-if="!showTable" class="i-mdi:eye"></i>
                    <i v-if="showTable" class="i-mdi:eye-off"></i>
                    {{ buttonText }}
                  </n-button>
                </div>

                <!-- table -->
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
              </n-tab-pane>
              <n-tab-pane name="jay chou" tab="Body">
                <div>
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
                  <div>
                    <textarea
                      ref="input"
                      v-model="inputValue"
                      @keyup.enter.prevent="submitInput"
                      class="w-full h-400px"
                    ></textarea>
                  </div>
                </div>
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </div>
        <div class="w1/3 bg-white overflow-y-auto h-80%">
          <h2 class="ml-5 text-truegray">Response</h2>
          <img v-if="showImg" src="./Postman.png" alt="" class="ml-10 mt-20" />
          <div class="whitespace-pre-wrap" v-if="responseData">
            <div v-show="!isLoading">
              <n-config-provider :hljs="hljs">
                <n-code :code="JSON.stringify(responseData, null, 2)" language="json" />
              </n-config-provider>
            </div>
          </div>
          <div v-if="errorMsg">
            <h2 class="ml-5 text-red-500">Error</h2>
            <p class="ml-5">{{ errorMsg }}</p>
          </div>
          <div v-if="isLoading" class="flex items-center justify-center h-full">
            <n-spin show-text />
          </div>
        </div>
      </div>
    </n-layout-footer>
  </n-layout>
</template>
<script setup>
import { ref, watch, watchEffect, nextTick } from "vue"
import axios from "axios"
import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"

hljs.registerLanguage("json", json)

const boxs = ref([])
const showTable = ref(false)
const toggleCount = ref(0)
const showImg = ref(true)

const newVariable = ref("")
const newInitialValue = ref("")
const newCurrentValue = ref("")

const inputValue = ref("")
const inputRef = ref(null)
const errorMsg = ref("")

const isLoading = ref(false)

const selectRef = ref("GET")
const inputData = ref("https://642541e49e0a30d92b2ccf2a.mockapi.io/Minhh")
const responseData = ref(null)
const toggleTable = () => {
  toggleCount.value++
  showTable.value = toggleCount.value % 2 === 1
}

const buttonText = computed(() => {
  return toggleCount.value % 2 === 0 ? "6 hidden" : "Hide auto-generated headers"
})

function addNewRow(index) {
  // kiểm tra xem giá trị của biến "newVariable" có khác rỗng hay không
  if (newVariable.value.trim() !== "") {
    boxs.value.splice(index + 1, 0, {
      // Hàm "splice" được sử dụng để thêm một mục mới vào danh sách "boxs" tại vị trí "index + 1"
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
      // Giá trị của các thuộc tính "variable", "initialValue" và "currentValue" của mục mới được đặt bằng giá trị hiện tại của các biến "newVariable", "newInitialValue" và "newCurrentValue".
    })
    // Sau khi thêm mục mới, giá trị của các biến "newVariable", "newInitialValue" và "newCurrentValue" được đặt lại là rỗng để chuẩn bị cho việc nhập giá trị mới cho các thuộc tính của mục tiếp theo.
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
// js bảng params

const params = ref([{ key: "", value: "", description: "", enabled: true, checked: true }])
const newParam = ref({ key: "", value: "", description: "", enabled: true })

function addParam() {
  params.value.push(newParam.value)
  newParam.value = { key: "", value: "", description: "", enabled: true, checked: true }
  updateQueryString()
}

function removeParam(index) {
  params.value.splice(index, 1)
  updateQueryString()
}
function handleInput(index) {
  if (index === params.value.length - 1) {
    params.value.push({ key: "", value: "", description: "", enabled: true, checked: true })
  }
  updateQueryString()
}

function toggleEnabled(index) {
  params.value[index].enabled = params.value[index].checked
  updateQueryString()
}

function updateQueryString() {
  // Lấy các tham số được chọn và có giá trị key từ mảng params, sử dụng method filter()
  const queryString = params.value
    .filter((param) => param.enabled && param.key)
    // Chuyển các tham số này thành chuỗi query string, sử dụng method map() và method join()
    .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
    .join("&")

  // Tạo một đối tượng URL từ giá trị đường dẫn hiện tại
  const url = new URL(inputData.value)
  // Cập nhật chuỗi truy vấn trong đường dẫn với chuỗi query string mới
  url.search = queryString
  // Cập nhật đường dẫn mới vào giá trị của input có id là "inputData"
  inputData.value = url.toString()
}

watch(params, () => {
  updateQueryString()
})
//js bảng params

watch(boxs, (newboxs) => {
  console.log(newboxs)
})

watchEffect(() => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = "auto"
      inputRef.value.style.height = `${inputRef.value.scrollHeight}px`
    }
  })
})

function submitInput() {
  console.log(inputValue.value)
}
const options = [
  {
    label: "Save as...",
  },
]

const options1 = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
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

const getApi = async () => {
  isLoading.value = true
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
  isLoading.value = false
  showImg.value = false
}

const handleGet = async () => {
  try {
    const response = await axios.get(inputData.value)

    responseData.value = response.data
  } catch (error) {
    console.error(error)
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
      responseData.value = error.response
    } else {
      errorMsg.value = "Đã xảy ra lỗi trong quá trình gửi yêu cầu"
      responseData.value = null
    }
  }
}
const handlePut = async () => {
  try {
    const data = JSON.parse(inputValue.value)
    const response = await axios.put(inputData.value, data)
    responseData.value = response.data
  } catch (error) {
    console.error(error)
    if (error.response) {
      responseData.value = error.response
    } else {
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
      responseData.value = error.response
    } else {
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
