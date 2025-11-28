import PhotoWidget from "../contexts/photos/components/photo-widget.tsx";
import Container from "../components/container.tsx";
import type {Photo} from "../contexts/photos/models/photo.ts";

export default function PageHome() {
    return (
        <Container>
            <div className={"grid grid-cols-4 gap-9"} >
                <PhotoWidget photo={{id: '123', title: 'Olá, mundo!', imageId: 'portrait-tower.png', album: [
                        {id: "123", title: "album1"},
                        {id: "456", title: "album2"},
                        {id: "789", title: "album3"}
                ]}} />
                <PhotoWidget photo={{id: '123', title: 'Olá, mundo!', imageId: 'portrait-tower.png', album: [
                        {id: "123", title: "album1"},
                        {id: "456", title: "album2"},
                        {id: "789", title: "album3"}
                ]}} />
                <PhotoWidget photo={{} as Photo} loading />
            </div>
        </Container>
    )
}