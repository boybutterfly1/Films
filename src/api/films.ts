import api from '@/api/api'

export default {
    getFilms (limit: number, page: number) {
        const params = {
            limit,
            page,
        }
        return api.get('list_movies.json', {params})
    },
    getFilmById (id: number) {
        const params = {
           movie_id: id
        }
        return api.get('movie_details.json', {params})
    }
}