import { actorMovieDTO } from "../actors/actor";
import { genreDTO } from "../genres/genre";
import { theaterDTO } from "../theaters/theater";

export interface createMovieDTO{
    title: string;
    summary: string;
    inTheaters: string;
    trailer: string;
    releaseDate: Date;
    poster: File;
    genresIds: number[]
    actors: actorMovieDTO[]
    theatersIds: number[]
}

export interface MovieDTO{
    id: number
    title: string;
    summary: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
    genres: genreDTO[]
    actors: actorMovieDTO[]
    theaters: theaterDTO[]
    userVote: number
    averageVote: number
}

export interface MoviePostGet {
    genres: genreDTO[];
    theaters: theaterDTO[];
}

export interface LandingPageDTO {
    inTheaters: MovieDTO[]
    futureReleases: MovieDTO[]
}

export interface MoviePutGet{
    movie: MovieDTO;
    selectedGenres: genreDTO[];
    noSelectedGenres: genreDTO[];
    selectedTheaters: theaterDTO[];
    noSelectedTheaters: theaterDTO[];
    actors: actorMovieDTO[];
}