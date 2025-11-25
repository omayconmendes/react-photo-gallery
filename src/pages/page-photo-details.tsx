import Text from "../components/text.tsx";
import {useParams} from "react-router";

export default function PagePhotoDetails() {

    const {id} = useParams();

    return (
        <>
            <Text variant={"heading-medium"}>Página detalhe da foto</Text>
            <hr />
            <Text variant={"heading-medium"}>Id da foto: {id}</Text>
        </>
    )
}