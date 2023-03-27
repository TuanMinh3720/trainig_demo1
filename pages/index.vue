<template>
  <n-layout>
    <n-layout-header class="">
      <div class="flex justify-between">
        <h3 class="text-black font-semibold">New Collection</h3>
        <div class="flex justify-center items-center">
          <div class="flex items-center mr-10 decoration-none">
            <div class="i-mdi:share text-xl"></div>
            <div class="cursor-pointer">Share</div>
          </div>
          <div class="flex items-center mr-10">
            <div class="i-mdi:source-fork text-xl"></div>
            <div class="cursor-pointer">Fork</div>
          </div>
          <div class="flex items-center mr-10">
            <div class="i-mdi:eye-outline text-xl"></div>
            <div class="cursor-pointer">Watch</div>
          </div>
          <div class="flex items-center mr-10">
            <div class="i-mdi:play-box-outline text-xl"></div>
            <div class="cursor-pointer">Run</div>
          </div>
          <div class="flex items-center mr-10">
            <div class="i-mdi:content-save-outline text-xl"></div>
            <div class="cursor-pointer">Save</div>
          </div>
          <div class="i-mdi:dots-horizontal text-xl"></div>
        </div>
      </div>
      <hr />
      <Header />
    </n-layout-header>

    <n-layout-content content-style="">
      <div class="flex">
        <div class="mr-10 cursor-pointer">Authorization</div>
        <div class="mr-10 cursor-pointer">Pre-request Scriat</div>
        <div class="mr-10 cursor-pointer">Test</div>
        <div class="mr-10 cursor-pointer relative">
          Variables
          <span class="absolute bottom-0 left-0 h-1 w-full bg-red-500 underline"></span>
          <span class="absolute ml-2 top-2 h-2 w-2 bg-green-500 rounded-full"></span>
        </div>
        <div class="mr-10 cursor-pointer">Runs</div>
      </div>
      <p>
        These variables are specific to this collection and its request. Learn more about
        <a href="#" style="text-decoration: underline">collection variables</a>
      </p>
    </n-layout-content>
    <n-layout-footer class="h-screen relative bg-white">
      <!-- search -->
      <div class="flex">
        <n-input type="text" size="small" placeholder="Filter Variables" style="width: 20%">
          <template #prefix>
            <img
              class="w-6 h-6 mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1200px-Search_Icon.svg.png"
              alt=""
            />
          </template>
        </n-input>
      </div>
      <br />

      <!-- tables -->
      <n-table :bordered="false" :single-line="false" class="w-full">
        <thead>
          <tr>
            <th class="w-5%"></th>
            <th class="w-15%">VARIABLE</th>
            <th class="w-15%">INITIAL VALUE</th>
            <th>CURRENT VALUE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(box, index) in boxs" :key="index">
            <td></td>
            <td>
              <input
                class="border-none"
                placeholder="Add a new variable"
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
                placeholder="Add a new variable"
                type="text"
                v-model="newVariable"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
            <td>
              <input
                class="border-none"
                type="text"
                v-model="newInitialValue"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
            <td>
              <input
                class="border-none"
                type="text"
                v-model="newCurrentValue"
                @keydown.enter="addNewRow(boxs.length)"
              />
            </td>
          </tr>
        </tbody>
      </n-table>
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

watch(boxs, (newboxs) => {
  console.log(newboxs)
})

onMounted(() => {
  console.log("Table mounted")
})
</script>
