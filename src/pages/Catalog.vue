<script setup lang="ts">
import FilmsList from '@/components/FilmsList.vue'
import Pagination from '@/components/Pagination.vue'
import { useFilmsStore } from '@/store/index'

const filmsStore = useFilmsStore()


</script>

<template>
  <div>
    <FilmsList />
    <Pagination />
  </div>
</template>

<style lang="scss">

</style>
