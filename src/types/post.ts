export interface IPost {
    uuid?: string;
    authorId: string; // Not for design
    title: string;
    description: string;
    address: ILocation;
    tags: string[];
    dangerLevel: number; // 1 - 10
    isVoluntary: boolean;
    author?: IAuthor;
}

export interface IAuthor {
    name: string;
    surname: string;
}

export interface ILocation {
    latitude: number;
    longitude: number;
}
