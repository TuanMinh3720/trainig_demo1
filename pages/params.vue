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
        <div class="w-1/2 h-screen">
          <div class="flex justify-between items-center">
            <div class="flex">
              <div class="mr-5 cursor-pointer text-green-500 font-100">
                Params
                <span class="absolute bottom-152 left-0 h-0.5 w-4% bg-red-500 underline"></span>
              </div>
              <NuxtLink to="/headers" class="mr-5 decoration-none text-black font-100">Headers</NuxtLink>
              <Nuxt-link to="/body" class="mr-5 decoration-none text-black font-100">Body</Nuxt-link>
            </div>
            <p class="text-blue-500 font-bold mr-5">Cookies</p>
          </div>
          <div class="flex items-center">
            <p class="font-bold">Query Param</p>
          </div>
          <!-- table -->
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
              <!-- v-for để lặp lại các hàng dữ liệu trong mảng boxs -->
              <!-- "v-model" được liên kết với thuộc tính "variable" của mục.
               Khi người dùng thay đổi giá trị của trường nhập liệu này, 
               thuộc tính "variable" của mục sẽ được cập nhật tương ứng. -->
              <!-- ":key" được sử dụng để gán một giá trị của index cho mỗi hàng dữ liệu -->
              <!-- "@keydown.enter" được sử dụng để bắt sự kiện nhấn phím "Enter" -->
              <!-- (index) dữ liệu hiện tại trong mảng "boxs" -->
              <!--(boxs.length) độ dài của mảng "boxs -->

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
          <h2 class="ml-5 text-truegray">Reponse</h2>
          <img class="mt-30% ml-30%" src="./Postman11.png" alt="" />
        </div>
      </div>
      <Footer />
    </n-layout-footer>
  </n-layout>
</template>
<script setup>
import { ref, watch, onMounted } from "vue"

const boxs = ref([])

const newVariable = ref("")
const newInitialValue = ref("")
const newCurrentValue = ref("")

function addNewRow(index) {
  // kiểm tra xem giá trị của biến "newVariable" có khác rỗng hay không
  if (newVariable.value.trim() !== "") {
    boxs.value.splice(index + 1, 0, {
      // Hàm "splice" được sử dụng để thêm một mục mới vào danh sách "boxs" tại vị trí "index + 1"
      variable: newVariable.value,
      initialValue: newInitialValue.value,
      currentValue: newCurrentValue.value,
      // Giá trị của các thuộc tính "variable", "initialValue" và "currentValue" của mục mới
      //  được đặt bằng giá trị hiện tại của các biến "newVariable", "newInitialValue" và "newCurrentValue".
    })
    // Sau khi thêm mục mới, giá trị của các biến "newVariable", "newInitialValue" và "newCurrentValue"
    // được đặt lại là rỗng để chuẩn bị cho việc nhập giá trị mới cho các thuộc tính của mục tiếp theo.
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
const value = ref(null)

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
const { data, pending, error, refresh } = await useFetch("/api/auth/login", {
  onRequest({ request, options }) {
    // Set the request headers
    options.headers = options.headers || {}
    options.headers.authorization = "..."
  },
  onRequestError({ request, options, error }) {
    // Handle the request errors
  },
  onResponse({ request, response, options }) {
    // Process the response data
    return response._data
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
  },
})
</script>
