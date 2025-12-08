import React from "react";
import {
    Dialog,
    DialogBody, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "../../../components/dialog.tsx";
import Button from "../../../components/button.tsx";
import InputText from "../../../components/input-text.tsx";
import Text from "../../../components/text.tsx";
import type {Photo} from "../../photos/models/photo.ts";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton.tsx";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable.tsx";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({trigger}: AlbumNewDialogProps) {

    // TODO: Utilizar API quando estiver pronta
    const isLoadingPhotos = false;
    const photos: Photo[] = [
        {
            id: "123",
            title: "Olá, mundo!",
            imageId: "portrait-tower.png",
            album: [
                {id: "456", title: "Album 1"},
                {id: "789", title: "Album 2"},
                {id: "000", title: "Album 3"},
            ]
        }
    ];

    function handleTogglePhoto(selected: boolean, photoId: string) {
        console.log(selected, photoId);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Criar álbum</DialogHeader>

                <DialogBody className={"flex flex-col gap-5"}>
                    <InputText placeholder={"Adicione um título"} />

                    <div className={"space-y-3"}>
                        <Text as={"div"} variant={"label-small"}>Fotos cadastradas</Text>

                        {!isLoadingPhotos && photos.length > 0 && (
                            <div className={"flex flex-wrap gap-2"}>
                                {photos.map((photo) => (
                                    <PhotoImageSelectable
                                        key={photo.id}
                                        src={`/images/${photo.imageId}`}
                                        title={photo.title}
                                        imageClassName={"w-20 h-20"}
                                        onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                                    />
                                ))}
                            </div>
                        )}

                        {isLoadingPhotos && (
                            <div className={"flex flex-wrap gap-2"}>
                                {Array.from({length: 4}).map((_, index) => (
                                <Skeleton key={`photo-loading-${index}`} className={"w-20 h-20 rounded-lg"} />
                                ))}
                            </div>
                        )}

                        {!isLoadingPhotos && photos.length == 0 && (
                            <div className={"w-full flex flex-col justify-center items-center gap-3"}>
                                <SelectCheckboxIllustration />
                                <Text variant={"paragraph-medium"}>
                                    Nenhuma foto disponível para seleção
                                </Text>
                            </div>

                        )}
                    </div>
                </DialogBody>

                <DialogFooter>
                    <DialogClose>
                        <Button variant={"secondary"}>Cancelar</Button>
                    </DialogClose>

                    <Button>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}