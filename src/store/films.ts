import { defineStore } from 'pinia'
import { Film } from '@/types/Film'
import apiFilms from '@/api/films'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films: [] as Film[],
    limit: 15,
    totalPages: 0,
    currentPage: 1,
    loading: true,
    savedFilms: [] as Film[],
    ratedFilms: [] as Film[],
  }),

  getters: {
    
  },

  actions: {
    async fetchFilms(page: number)  {
      try {
        const response = await apiFilms.getFilms(this.limit, page)
        this.films = response.data.data.movies
        this.currentPage = page
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    },
    async fetchFilmByID(id: number) {
      try {
        const response = await apiFilms.getFilmById(id)
        return response.data.data.movie
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    },
    async getTotalPages() {
      const response = await apiFilms.getFilms(this.limit, 1)
      this.totalPages = Math.ceil(response.data.data.movie_count / this.limit)
    },
    makeSaved(id: number) {
      if (this.savedFilms.filter(f => f.id === id).length === 0) {
        this.savedFilms.push(...this.films.filter(f => f.id === id))
      }
    },
    deleteFromSaved(id: number) {
      this.savedFilms = this.savedFilms.filter((f: Film) => f.id !== id)
    }
  }
})
