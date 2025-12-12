import React from "react";
import type {Album} from "../models/album.ts";
import Text from "../../../components/text.tsx";
import Button from "../../../components/button.tsx";
import cx from "classnames";
import Skeleton from "../../../components/skeleton.tsx";
import usePhotos from "../../photos/hooks/use-photos.ts";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
    albums: Album[];
    loading?: boolean;
}

export default function AlbumsFilter({albums, loading, className, ...props}: AlbumsFilterProps) {
    const {filters} = usePhotos();

    return (
        <div className={cx("flex items-center gap-3.5 overflow-auto", className)} {...props}>
            <Text variant={"heading-small"}>Álbuns</Text>
            <div className={"flex gap-3"}>
                {!loading ? (
                    <>
                        <Button variant={filters.albumId === null ? "primary" : "ghost"}
                                size={"sm"}
                                className={"cursor-pointer"}
                                onClick={() => filters.setAlbumId(null)}
                        >
                            Todos
                        </Button>
                        {albums.map((album) => (
                                <Button
                                    key={album.id}
                                    variant={filters.albumId === album.id ? "primary" : "ghost"}
                                    size={"sm"}
                                    className={"cursor-pointer"}
                                    onClick={() => filters.setAlbumId(album.id)}
                                >
                                    {album.title}
                                </Button>
                        ))}
                    </>
                ) : (
                    Array.from({length: 5}).map((_, index) => (
                        <Skeleton key={`album-button-loading-${index}`} className={"w-28 h-7"} />
                    ))
                )}
            </div>
        </div>
    )
}