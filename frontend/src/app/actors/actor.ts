export interface actorDTO{
    id: number
    name: string
    birthDate: Date
    photo: string
    biography: string
}

export interface createActorDTO{
    name: string
    birthDate: Date
    photo: File
    biography: string
}

export interface actorMovieDTO{
    id: number;
    name: string;
    character: string;
    photo: string;
}