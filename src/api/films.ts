import api from '@/api/api'

export default {
    getFilms (limit: number, page: number): Promise<any> {
        const params = {
            limit,
            page,
        }
        return api.get('list_movies.json', {params})
    },
    getFilmById (id: number): Promise<any> {
        const params = {
           movie_id: id
        }
        return api.get('movie_details.json', {params})
    }
}