import type { Album } from "../../albums/models/album.ts";

export interface Photo {
    id: string;
    title: string;
    imageId: string;
    album: Album[]
}