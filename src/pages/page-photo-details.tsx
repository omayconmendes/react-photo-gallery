import Text from "../components/text.tsx";
import Container from "../components/container.tsx";
import type {Photo} from "../contexts/photos/models/photo.ts";
import Skeleton from "../components/skeleton.tsx";
import PhotosNavigator from "../contexts/photos/components/photos-navigator.tsx";
import ImagePreview from "../components/image-preview.tsx";
import Button from "../components/button.tsx";

export default function PagePhotoDetails() {

    // Apenas para testar o mock
    const isLoadingPhoto = false;
    const photo = {
        id: "123",
        title: "Olá, mundo!",
        imageId: "portrait-tower.png",
        album: [
            {id: "456", title: "Album 1"},
            {id: "789", title: "Album 2"},
            {id: "000", title: "Album 3"},
        ]
    } as Photo;

    return (
        <Container>
            <header className={"flex items-center justify-between gap-8 mb-8"}>
                {!isLoadingPhoto ? (
                    <Text variant={"heading-large"}>{photo?.title}</Text>
                ) : (
                    <Skeleton className={"w-48 h-8"}/>
                )}
                <PhotosNavigator loading={isLoadingPhoto} />
            </header>

            <div className={"grid grid-cols-[21rem] gap-24"}>
                <div className={"space-y-3"}>
                    {!isLoadingPhoto ? (
                        <ImagePreview src={`/images/${photo?.imageId}`} title={photo?.title} imageClassName={"h-[21rem]"} />
                    ) : (
                        <Skeleton className={"h-[21rem]"} />
                    )}

                    {!isLoadingPhoto ? (
                        <Button variant={"destructive"}>Excluir</Button>
                    ) : (
                        <Skeleton className={"w-20 h10"} />
                    )}
                </div>
            </div>
        </Container>
    )
}