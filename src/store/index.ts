import { defineStore } from 'pinia'
import axios from 'axios';
import { Film } from '@/types/Film'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films: [] as Film[],
  }),

  getters: {
    
  },

  actions: {
    async getFilms() {
      try {
        const response = await axios.get('')
        this.films = response.data
      } catch (error) {
        alert(error)
      }
    }
  }
})