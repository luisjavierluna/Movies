export interface actorDTO{
    name: string;
    dateOfBirth: Date;
    photo: string;
}

export interface createActorDTO{
    name: string;
    dateOfBirth: Date;
    photo: File;
}