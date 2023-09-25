<script setup lang="ts">
import { onMounted, ref } from 'vue'

const pagPages = ref<number[]>([])
const props = defineProps<{
  totalPages: number
}>()

const changePage = (page: number, emit: (event: string, payload?: any) => void) => {
  if (props.totalPages > 10 && page > 5 && pagPages.value) {
    const newVisPages = []
    for (let i = page - 4; i <= page + 5; i++) {
      newVisPages.push(i)
    }
    pagPages.value = newVisPages
  } else {
    pagPages.value = Array.from({ length: 10}, (_, i) => i + 1)
  }
  emit('changePage', page)
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
  <div>
    <button @click="changePage(1, $emit)">&lt;&lt;</button>
    <button
      v-for="page in pagPages"
      :key="page"
      @click="changePage(page, $emit)"
    >
      {{ page }}
    </button>
    <button @click="changePage(props.totalPages, $emit)">>></button>
  </div>
</template>

<style lang="scss">

</style>
