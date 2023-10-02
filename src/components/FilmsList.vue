<script setup lang="ts">
import { useFilmsStore } from '@/store/films'
import { useUsersStore} from "@/store/users";
import FilmsItem from '@/components/FilmsItem.vue'
import Pagination from '@/components/Pagination.vue'
import {computed, onMounted, ref, watch} from 'vue';
import Loading from "@/components/UI/Loading.vue";

const filmsStore = useFilmsStore()
const usersStore = useUsersStore()
const showSaved = ref(false)

const catalog = computed(() => {
  if (showSaved.value) {
    return filmsStore.savedFilms
  } else {
    return filmsStore.films
  }
})

watch(computed(() => usersStore.isLoggedIn), () => {

})
</script>

<template>
  <div class="catalog-options">
    <div
        @click="showSaved = false"
        :class="{ active: !showSaved }"
    >
      All
    </div>
    <div
      v-if="usersStore.isLoggedIn"
      @click="showSaved = true"
      :class="{ active: showSaved }"
    >
      Watch List
    </div>
  </div>
      <button class="delete"
        v-if="showSaved && filmsStore.savedFilms.length > 0"
        @click="filmsStore.savedFilms = []"
      >
        Delete all
      </button>

  <div v-if="filmsStore.loading===false">
    <div class="container">
<!--    <TransitionGroup name="film-list">-->
      <films-item
        v-for="film in catalog"
        :film="film"
        :key="film.id"
      />
    </div>
<!--    </TransitionGroup>-->
    <pagination
      v-if="!showSaved && filmsStore.loading===false"
      @changePage="filmsStore.fetchFilms"
      :totalPages="filmsStore.totalPages"
    />
  </div>
  <loading
   v-else
  />

</template>

<style lang="scss" scoped>
.catalog-options {
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
  margin: auto auto 20px;
  cursor: pointer;
}
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
  justify-content: center
}
div.active {
  text-decoration: underline;
}

//.film-list-item {
//  display: inline-block;
//  margin-right: 10px;
//}
//.film-list-enter-active,
//.film-list-leave-active {
//  transition: all 0.4s ease;
//}
//.film-list-enter-from,
//.film-list-leave-to {
//  opacity: 0;
//  transform: translateY(-200px);
//}
//.film-list-move {
//  transition: all 0.4s ease;
//}
</style>
