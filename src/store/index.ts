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
    async fetchFilms(currPage: number) {
      try {
        this.page = currPage
        const response = await apiFilms.getFilms(this.limit, this.page)
        this.films = response.data.data.movies
        this.totalPages = Math.ceil(response.data.data.movie_count / this.limit)
      } catch (error) {
        alert(error)
      }
    }
  }
})