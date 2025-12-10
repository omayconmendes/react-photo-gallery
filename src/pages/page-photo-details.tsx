import Text from "../components/text.tsx";
import Container from "../components/container.tsx";
import type {Photo} from "../contexts/photos/models/photo.ts";
import Skeleton from "../components/skeleton.tsx";
import PhotosNavigator from "../contexts/photos/components/photos-navigator.tsx";
import ImagePreview from "../components/image-preview.tsx";
import Button from "../components/button.tsx";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable.tsx";
import useAlbums from "../contexts/albums/hooks/use-albums.ts";

export default function PagePhotoDetails() {
    const {albumsList, isLoadingAlbums} = useAlbums();
    // Apenas para testar o mock
    const isLoadingPhoto = false;

    const photo = {
        id: "123",
        title: "Olá, mundo!",
        imageId: "portrait-tower.png",
        albums: [
            {
                id: "2a8aaf8c-afdf-4db0-9877-ac1fed91887f",
                title: "Melhores fotos"
            },
            {
                id: "9d034618-9cab-40c1-be98-036c5a7b1875",
                title: "Viagens"
            }
        ]
    } as Photo;

    return (
        <Container>
            <header className={"flex items-center justify-between gap-8 mb-8"}>
                {!isLoadingPhoto ? (
                    <Text as={"h2"} variant={"heading-large"}>{photo?.title}</Text>
                ) : (
                    <Skeleton className={"w-48 h-8"}/>
                )}
                <PhotosNavigator loading={isLoadingPhoto} />
            </header>

            <div className={"grid grid-cols-[21rem_1fr] gap-24"}>
                <div className={"space-y-3"}>
                    {!isLoadingPhoto ? (
                        <ImagePreview src={`/images/${photo?.imageId}`} title={photo?.title} imageClassName={"h-[21rem]"} />
                    ) : (
                        <Skeleton className={"h-[21rem]"} />
                    )}

                    {!isLoadingPhoto ? (
                        <Button variant={"destructive"}>Excluir</Button>
                    ) : (
                        <Skeleton className={"w-20 h-10"} />
                    )}
                </div>

                <div className={"py-3"}>
                    <Text as={"h3"} variant={"heading-medium"} className={"mb-6"}>
                        Álbuns
                    </Text>

                    <AlbumsListSelectable
                        photo={photo}
                        loading={isLoadingAlbums}
                        albums={albumsList} />
                </div>
            </div>
        </Container>
    )
}