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
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../components/skeleton.tsx";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable.tsx";
import usePhotos from "../../photos/hooks/use-photos.ts";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({trigger}: AlbumNewDialogProps) {
    const { photosList, isLoadingPhotos } = usePhotos();

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

                        {!isLoadingPhotos && photosList.length > 0 && (
                            <div className={"flex flex-wrap gap-2"}>
                                {photosList.map((photo) => (
                                    <PhotoImageSelectable
                                        key={photo.id}
                                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
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

                        {!isLoadingPhotos && photosList.length == 0 && (
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