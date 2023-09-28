<script setup lang="ts">
import { useRoute } from 'vue-router'
import {onMounted, ref} from 'vue'
import FilmsList from "@/components/FilmsList.vue";
import {useFilmsStore} from "@/store";

const filmsStore = useFilmsStore()
const route = useRoute()
const currentPage = ref(Number(route.params.currentPage))

onMounted(() => {
  filmsStore.fetchFilms(currentPage.value)
})
</script>

<template>
  <FilmsList />
</template>

<style lang="scss">
</style>
