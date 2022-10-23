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
    title: string;
    summary: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate: Date;
    poster: string;
}

export interface MoviePostGet {
    genres: genreDTO[];
    theaters: theaterDTO[];
}