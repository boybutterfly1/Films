<script setup lang="ts">
import { useFilmsStore } from '@/store/index'
import FilmsItem from '@/components/FilmsItem.vue'

const filmsStore = useFilmsStore()
</script>

<template>
  <div class="films">
    <films-item
      v-for="film in filmsStore.films"
      :film="film"
    />
  </div>
</template>

<style lang="scss">
.films {
  display: flex;
  flex-wrap: wrap;
}
</style>
