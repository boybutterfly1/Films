export type Film = {
    id: number | null,
    title: string | null,
    genres?: Array<string | null>,
    synopsis: string | null,
    year: string | null,
    medium_cover_image: string,
    rating: number | null
}