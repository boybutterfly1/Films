export type Film = {
    id: number,
    title: string | null,
    genres: Array<string | null>,
    synopsis: string | null,
    year: string | null,
    medium_cover_image: string,
    rating?: number | null,
    saved: boolean
}