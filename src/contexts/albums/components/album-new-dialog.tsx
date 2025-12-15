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
import {useForm} from "react-hook-form";
import {albumNewFormSchema, type AlbumNewFormSchema} from "../schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import useAlbum from "../hooks/use-album.ts";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({trigger}: AlbumNewDialogProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const form = useForm<AlbumNewFormSchema>({resolver: zodResolver(albumNewFormSchema)})
    const { photosList, isLoadingPhotos } = usePhotos();
    const {createAlbum} = useAlbum();
    const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition();


    function handleTogglePhoto(selected: boolean, photoId: string) {
        const photosIds = form.getValues("photosIds") || [];
        let newValue = []

        if (selected) {
            newValue = [...photosIds, photoId];
        } else {
            newValue = photosIds.filter((id: string) => id !== photoId);
        }

        form.setValue("photosIds", newValue);
    }

    React.useEffect(() => {
        if (!modalOpen) {
            form.reset();
        }
    }, [modalOpen, form])

    function handleSubmit(payload: AlbumNewFormSchema) {
        setIsCreatingAlbum(async () => {
            await createAlbum(payload);
            setModalOpen(false);
        })
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>Criar álbum</DialogHeader>

                    <DialogBody className={"flex flex-col gap-5"}>
                        <InputText placeholder={"Adicione um título"} error={form.formState.errors.title?.message} {...form.register("title")} />

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
                            <Button variant={"secondary"} disabled={isCreatingAlbum}>Cancelar</Button>
                        </DialogClose>

                        <Button type={"submit"} disabled={isCreatingAlbum} handling={isCreatingAlbum}>{isCreatingAlbum ? "Criando..." : "Criar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}