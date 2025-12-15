import React from "react";
import Text from "../components/text.tsx";
import Container from "../components/container.tsx";
import Skeleton from "../components/skeleton.tsx";
import PhotosNavigator from "../contexts/photos/components/photos-navigator.tsx";
import ImagePreview from "../components/image-preview.tsx";
import Button from "../components/button.tsx";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable.tsx";
import useAlbums from "../contexts/albums/hooks/use-albums.ts";
import usePhoto from "../contexts/photos/hooks/use-photo.ts";
import {useParams} from "react-router";
import type {Photo} from "../contexts/photos/models/photo.ts";

export default function PagePhotoDetails() {
    const {id} = useParams();
    const {photo, isLoadingPhoto, previousPhotoId, nextPhotoId, deletePhoto} = usePhoto(id);
    const {albumsList, isLoadingAlbums} = useAlbums();
    const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition();

    function handleDeletePhoto() {
        setIsDeletingPhoto(async () => {
            await deletePhoto(photo!.id);
        })
    }

    if (!isLoadingPhoto && !photo) {
        return <div>Foto não encontrada</div>
    }


    return (
        <Container>
            <header className={"flex items-center justify-between gap-8 mb-8"}>
                {!isLoadingPhoto ? (
                    <Text as={"h2"} variant={"heading-large"}>{photo?.title}</Text>
                ) : (
                    <Skeleton className={"w-48 h-8"}/>
                )}
                <PhotosNavigator loading={isLoadingPhoto} previousPhotoId={previousPhotoId} nextPhotoId={nextPhotoId} />
            </header>

            <div className={"grid grid-cols-[21rem_1fr] gap-24"}>
                <div className={"space-y-3"}>
                    {!isLoadingPhoto ? (
                        <ImagePreview src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`} title={photo?.title} imageClassName={"h-[21rem]"} />
                    ) : (
                        <Skeleton className={"h-[21rem]"} />
                    )}

                    {!isLoadingPhoto ? (
                        <Button variant={"destructive"} onClick={handleDeletePhoto} disabled={isDeletingPhoto}>
                            {isDeletingPhoto ? "Excluindo..." : "Excluir"}
                        </Button>
                    ) : (
                        <Skeleton className={"w-20 h-10"} />
                    )}
                </div>

                <div className={"py-3"}>
                    <Text as={"h3"} variant={"heading-medium"} className={"mb-6"}>
                        Álbuns
                    </Text>

                    <AlbumsListSelectable
                        photo={photo as Photo}
                        loading={isLoadingAlbums}
                        albums={albumsList} />
                </div>
            </div>
        </Container>
    )
}