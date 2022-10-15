export interface actorDTO{
    name: string;
    birthDate: Date;
    photo: string;
}

export interface createActorDTO{
    name: string;
    birthDate: Date;
    photo: File;
    biography: string;
}