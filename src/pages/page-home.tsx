import Container from "../components/container.tsx";
import PhotosList from "../contexts/photos/components/photos-list.tsx";
import AlbumsFilter from "../contexts/albums/components/albums-filter.tsx";

export default function PageHome() {
    return (
        <Container>
            <AlbumsFilter albums={[
                {id: "456", title: "Album 1"},
                {id: "789", title: "Album 2"},
                {id: "000", title: "Album 3"}
            ]} className={"mb-9"} />
            <PhotosList photos={[
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
            ]} />
            <PhotosList photos={[]} loading />
        </Container>
    )
}