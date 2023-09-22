<script setup lang="ts">
import { Film } from '@/types/Film'

const props = defineProps<{ 
  film: Film,
}>()
</script>

<template>
  <div>
    <img :src="film.large_cover_image" alt="film cover image" />
    <span>{{ film.title }}</span>
    <span v-for="genre in film.genres">{{ genre }}</span>
    <span>{{ film.year }}</span>
    <span>{{ film.rating }}</span>
  </div>
</template>

<style lang="scss">

</style>
