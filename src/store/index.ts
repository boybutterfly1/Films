import { defineStore } from 'pinia'
import { Film } from '@/types/Film'
import apiFilms from '@/api/films'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films: null as Film[] | null,
    page: 1,
    limit: 10,
    totalPages: 0
  }),

  getters: {
    
  },

  actions: {
    async fetchFilms() {
      try {
        const response = await apiFilms.getFilms(this.limit, this.page)
        this.films = response.data.data.movies
      } catch (error) {
        alert(error)
      }
    },
    async fetchMoreFilms() {
      try {
        this.page += 1
        const response = await apiFilms.getFilms(this.limit, this.page)
        this.films = [...(this.films || []), ...(response.data.data.movies || [])]
      } catch (error) {
        alert(error)
      }
    }
  }
})