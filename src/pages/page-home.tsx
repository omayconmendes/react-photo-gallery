import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
    const { albumsList, isLoadingAlbums } = useAlbums();

    return (
        <Container>
            <AlbumsFilter
                albums={albumsList}
                loading={isLoadingAlbums}
                className="mb-9"
            />

            <PhotosList
                photos={[
                    {
                        id: "123",
                        title: "Olá mundo!",
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
                        ],
                    },
                ]}
            />
        </Container>
    );
}