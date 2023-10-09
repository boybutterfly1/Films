import { defineStore } from 'pinia'
import { Film, List } from '@/types/types'
import apiFilms from '@/api/films'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films: [] as Film[],
    limit: 30,
    totalPages: 0,
    currentPage: 1,
    loading: true,
    savedFilms: [] as Film[],
    ratedFilms: [] as Film[],
    ratedFilmsOrderChanged: false,
    filmsLists: [] as List[],
  }),

  getters: {
    
  },

  actions: {
    async fetchFilms(page: number)  {
      try {
        const response = await apiFilms.getFilms(this.limit, page)
        this.films = response.data.data.movies
        this.currentPage = page
        this.films.forEach(film => film.saved = false)
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    },
    async fetchFilmByID(id: number): Promise<Film | null> {
      try {
        const response = await apiFilms.getFilmById(id)
        const film = response.data.data.movie
        film.saved = this.savedFilms.some((film: Film): boolean => film.id === id);
        return film
      } catch (e) {
        alert(e)
        return null
      } finally {
        this.loading = false
      }
    },
    async getTotalPages() {
      const response = await apiFilms.getFilms(this.limit, 1)
      this.totalPages = Math.ceil(response.data.data.movie_count / this.limit)
    },
    makeSaved(id: number) {
      if (!this.savedFilms.some(f => f.id === id)) {
        const film = this.films.find((film: Film) => film.id === id);
        if (film) {
          film.saved = true;
          this.savedFilms.push(film);
          console.log('saved', film)
        }
      }
    },
    deleteFromSaved(id: number) {
      const film = this.savedFilms.find((film: Film) => film.id === id)
      if (film) {
        film.saved = false
        this.savedFilms = this.savedFilms.filter((film: Film) => film.id !== id)
        console.log('deleted')
      }
    }
  }
})
