import React from "react";
import InputText from "./input-text.tsx";
import SearchIcon from "../assets/icons/search.svg?react";
import {debounce} from "../helpers/utils.ts";
import usePhotos from "../contexts/photos/hooks/use-photos.ts";

export default function PhotosSearch() {
    const [inputValue, setInputValue] = React.useState("");
    const {filters} = usePhotos();

    const debouncedSetValue = React.useCallback(
        debounce((value: string) => {
            filters.setQ(value)
        }, 200), [filters.setQ]
    )

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setInputValue(value);
        debouncedSetValue(value);
    }

    return (
        <InputText icon={SearchIcon} placeholder={"Buscar fotos"} value={inputValue} className={"flex-1"} onChange={handleInputChange} />
    )
}