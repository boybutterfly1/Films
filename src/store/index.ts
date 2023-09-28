import { defineStore } from 'pinia'
import { Film } from '@/types/Film'
import apiFilms from '@/api/films'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films: [] as Film[],
    limit: 9,
    totalPages: 0,
    currentPage: 1,
    loading: true,
    images: false,
    savedFilms: [] as Film[],
  }),

  getters: {
    
  },

  actions: {
    async fetchFilms(page: number)  {
      try {
        this.images = false;
        const response = await apiFilms.getFilms(this.limit, page)
        const fetchedFilms = response.data.data.movies
        fetchedFilms.forEach((film: Film) => {
          film.saved = this.savedFilms.filter(f => film.id === f.id).length !== 0;
        })
        this.films = fetchedFilms
        this.currentPage = page
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
        this.images = true
      }
    },
    async getTotalPages() {
      const response = await apiFilms.getFilms(this.limit, 1)
      this.totalPages = Math.ceil(response.data.data.movie_count / this.limit)
    },
    makeSaved(id: number) {
      if (this.savedFilms.filter(f => f.id === id).length == 0) {
        this.savedFilms.push(...this.films.filter(f => f.id === id))
        this.savedFilms.forEach(f => f.id === id ? f.saved = true : 0)
      }
    },
    deleteFromSaved(id: number) {
      this.savedFilms = this.savedFilms.filter((f: Film) => f.id !== id)
      this.films.forEach(f => f.id === id ? f.saved = false : 0)
    }
  }
})