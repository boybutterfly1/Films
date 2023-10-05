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
    ratedFilmsOrderChanged: false,
    filmsLists: [
      {name: 'List 1', films: [{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'}]},
      {name: 'List 2', films: [{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'}]},
      {name: 'List 3', films: [{img: 'https://yts.mx/assets/images/movies/saturday_night_and_sunday_morning_1960/medium-cover.jpg'}, {img: 'https://yts.mx/assets/images/movies/fugue_2_2018/medium-cover.jpg'},{img: 'https://yts.mx/assets/images/movies/the_reunion_2_2022/medium-cover.jpg'}]},
    ]
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
