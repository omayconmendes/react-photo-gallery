import {useQuery} from "@tanstack/react-query";
import type {Photo} from "../models/photo.ts";
import {fetcher} from "../../../helpers/api.ts";
import {createSerializer, parseAsString, useQueryState} from "nuqs";

const toSearchParams = createSerializer({
    albumId: parseAsString,
    q: parseAsString
})

export default function usePhotos() {
    const [albumId, setAlbumId] = useQueryState("albumId");
    const [q, setQ] = useQueryState("q") // q é utilizado para indicar o valor que está sendo filtrado.

    const {data, isLoading} = useQuery<Photo[]>({
        queryKey: ["photos", albumId, q],
        queryFn: () => fetcher(`/photos${toSearchParams({albumId, q})}`)
    })

    return {
        photosList: data || [],
        isLoadingPhotos: isLoading,
        filters: { albumId, setAlbumId, q, setQ }
    }
}