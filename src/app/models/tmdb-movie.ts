export interface TmdbMovie {
    adult: boolean;
    belongs_to_collection: Object;
    backdrop_path: string;
    budget: number;
    genres: Object[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Object[];
    production_countries: Object[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: Object[];
    status: string;
    tagline: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;


}