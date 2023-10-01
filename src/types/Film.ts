export type Film = {
    id: number,
    title: string,
    genres: Array<string>,
    synopsis: string,
    year: string,
    medium_cover_image: string,
    large_cover_image: string,
    rating?: number,
    saved: boolean,
    description_full: string,
    background_image: string
}