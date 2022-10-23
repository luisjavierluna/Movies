import { genreDTO } from "../genres/genre";
import { theaterDTO } from "../theaters/theater";

export interface createMovieDTO{
    title: string;
    summary: string;
    inTheaters: string;
    trailer: string;
    releaseDate: string;
    poster: File;
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