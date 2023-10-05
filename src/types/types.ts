export interface Film {
    id: number,
    title: string,
    genres: Array<string>,
    synopsis: string,
    year: string,
    small_cover_image: string,
    medium_cover_image: string,
    large_cover_image: string,
    rating?: number,
    saved: boolean,
    description_full: string,
    background_image: string,
    userRating?: number,
}
export interface User {
    id: Number,
    name: String,
    login: String,
    password: String,
    regDate: String
}
export interface List {
    id: number | null,
    name: string,
    films: Film[]
}