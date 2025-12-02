import type {Album} from "../models/album.ts";
import type {Photo} from "../../photos/models/photo.ts";
import Text from "../../../components/text.tsx";
import InputCheckbox from "../../../components/input-checkbox.tsx";
import Divider from "../../../components/divider.tsx";
import Skeleton from "../../../components/skeleton.tsx";
import * as string_decoder from "node:string_decoder";

interface AlbumsListSelectableProps {
    loading?: boolean;
    albums: Album[];
    photo: Photo;
}

export default function AlbumsListSelectable({loading, photo, albums}: AlbumsListSelectableProps) {

    function isChecked(albumId: string) {
        return photo?.album?.some((album) => album.id === albumId);
    }

    function handledPhotoOnAlbums(albumId: string) {
        let albumsIds = [];

        if (isChecked(albumId)) {
            albumsIds = photo.album.filter((album) => album.id !== albumId).map((album) => album.id)
        } else {
            albumsIds = [...photo.album.map((album) => album.id), albumId]
        }

        console.log('Esses são os albums que vamos enviar para o back-end: ', albumsIds);
    }

    return (
        <ul className={"flex flex-col gap-4"}>
            {!loading && albums?.length > 0 && albums.map((album, index) => (
                <li key={album.id}>
                    <div className={"flex items-center justify-between gap-1"}>
                        <Text variant={"paragraph-large"} className={"truncate"}>
                            {album.title}
                        </Text>
                        <InputCheckbox defaultChecked={isChecked(album.id)} onClick={() => handledPhotoOnAlbums(album.id)} />
                    </div>
                    {index !== albums.length -1 && <Divider className={"mt-4"} />}
                </li>
            ))}
            {loading && Array.from({length: 5}).map((_, index) => (
                <li key={`albums-list-${index}`}>
                    <Skeleton className={"h-[2.5rem]"} />
                </li>
            ))}
        </ul>
    )
}
