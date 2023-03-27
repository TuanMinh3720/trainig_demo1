<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">hi</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <div class="h-screen">
    <n-layout has-sider>
      <n-layout-sider class="bg-#e5e5e5 h-screen" content-style="padding: 24px;">
        <div class="flex">
          <div class="i-mdi:plus text-xl" @click="addCollection"></div>

          <input class="w80% h3% text-blue" type="text" />
          <div class="i-mdi:dots-horizontal text-xl"></div>
        </div>
        <div class="">
          <!-- v-for="(i, index) in items" để in ra vị trí của đối tượng trong mảng
        v-for dùng of hoặc in đều được -->

          <n-collapse class="flex justify-between" v-for="(i, index) in items" :key="index">
            <n-collapse-item :title="i.title" name="">
              <n-collapse-item :title="x.title" v-for="(x, index) in i.data" :key="index"> </n-collapse-item>
            </n-collapse-item>
            <n-dropdown
              placement="bottom-start"
              trigger="click"
              size="small"
              :options="options"
              @select="(key) => clickFolder(index, key)"
            >
              <div class="i-mdi:dots-horizontal text-xl"></div>
            </n-dropdown>
          </n-collapse>
        </div>
      </n-layout-sider>
    </n-layout>
  </div>
</template>
<script setup>
import { ref } from "vue"

const items = ref([])

const addCollection = () => {
  let newItem = {
    title: "New Collection",
    data: [],
  }
  items.value.push(newItem)
}
const options = [
  {
    label: "Add Folder",
    key: 1,
  },
  {
    label: "Edit",
    key: 2,
  },
  {
    label: "Delete",
    key: 3,
  },
]
const clickFolder = (index, key) => {
  console.log("🚀 ~ file: default.vue:64 ~ clickFolder ~ item:", index, items.value[index])
  if (key === 1) {
    let dataFolder = {
      title: "New Folder",
      data: [],
    }
    items.value[index].data.push(dataFolder)
  }
}
</script>
