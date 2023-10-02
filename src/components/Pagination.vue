<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFilmsStore } from "@/store/films";

const filmsStore =  useFilmsStore()
const pagPages = ref<number[]>([])
const props = defineProps<{
  totalPages: number,
}>()

const currentPage = ref(filmsStore.currentPage)
const changePage = (page: number, emit?: (event: string, payload?: any) => void) => {
  if (props.totalPages > 10 && page > 5 && pagPages.value) {
    pagPages.value = []
    for (let i = page - 4; i <= page + 5 && i <= props.totalPages; i++) {
      pagPages.value.push(i)
    }
  } else {
    pagPages.value = Array.from({ length: 10 }, (_, i) => i + 1)
  }
  if (emit){
    emit('changePage', page);
  }
  currentPage.value = page
}


onMounted(() => {
  if (filmsStore.currentPage >= 10) {
    changePage(filmsStore.currentPage)
  } else {
    if (props.totalPages > 10) {
      pagPages.value = Array.from({ length: 10}, (_, i) => i + 1)
    } else {
      pagPages.value = Array.from({ length: props.totalPages}, (_, i) => i + 1)
    }
  }
})
</script>

<template>
  <div class="pagination">
    <button @click="changePage(1, $emit); $router.push(`/catalog/page/${1}`)">&lt;&lt;</button>
    <button
        v-for="page in pagPages"
        :key="page"
        @click="changePage(page, $emit); $router.push(`/catalog/page/${page}`)"
        :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button @click="changePage(props.totalPages, $emit); $router.push(`/catalog/page/${props.totalPages}`)">>></button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 70px;
  background-color: black;
}

.pagination button {
  border-radius: 4px;
  padding: 5px 8px;
  margin: 0 5px;
  border: none;
  background-color: #111111;
  color: #fff;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 30px;
}

.pagination button:hover {
  background-color: #39393d;
}

.pagination button.active {
  background-color: #39393d;
}
</style>
