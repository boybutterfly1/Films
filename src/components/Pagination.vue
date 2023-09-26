<script setup lang="ts">
import { onMounted, ref } from 'vue'

const pagPages = ref<number[]>([])
const props = defineProps<{
  totalPages: number
}>()
const currentPage = ref(1)
const changePage = (page: number, emit: (event: string, payload?: any) => void) => {
  if (props.totalPages > 10 && page > 5 && pagPages.value) {
    const newVisPages = []
    for (let i = page - 4; i <= page + 5; i++) {
      newVisPages.push(i)
    }
    pagPages.value = newVisPages
  }  else {
    pagPages.value = Array.from({ length: 10}, (_, i) => i + 1)
  }
  emit('changePage', page)
  currentPage.value = page
}

onMounted(() => {
  if (props.totalPages > 10) {
    pagPages.value = Array.from({ length: 10}, (_, i) => i + 1)
  } else {
    pagPages.value = Array.from({ length: props.totalPages}, (_, i) => i + 1)
  }
})
</script>

<template>
  <div class="pagination">
    <button @click="changePage(1, $emit)">&lt;&lt;</button>
    <button
        v-for="page in pagPages"
        :key="page"
        @click="changePage(page, $emit)"
        :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button @click="changePage(props.totalPages, $emit)">>></button>
  </div>
</template>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  border-radius: 4px;
  padding: 5px 8px;
  margin: 0 5px;
  border: none;
  background-color: #575764;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #333;
}

.pagination button.active {
  background-color: #333;
}
</style>
