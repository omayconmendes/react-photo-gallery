import React from "react";
import Skeleton from "../../../components/skeleton.tsx";
import ButtonIcon from "../../../components/button-icon.tsx";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import Button from "../../../components/button.tsx";
import {useNavigate} from "react-router";
import cx from "classnames";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
    previousPhotoId?: string;
    nextPhotoId?: string;
    loading?: boolean;
}

export default function PhotosNavigator({loading, nextPhotoId, previousPhotoId, className, ...props}: PhotosNavigatorProps) {

    const navigate = useNavigate();

    return (
        <div className={cx("flex gap-2", className)} {...props}>
            {!loading ? (
                <>
                    <ButtonIcon icon={ArrowLeftIcon} variant={"secondary"} disabled={!previousPhotoId} onClick={() => navigate(`/fotos/${previousPhotoId}`)} />
                    <Button variant={"secondary"} icon={ArrowRightIcon} disabled={!nextPhotoId} onClick={() => navigate(`/fotos/${nextPhotoId}`)} >
                        Próxima imagem
                    </Button>
                </>
                ) : (
                <>
                    <Skeleton className={"w-10 h10"} />
                    <Skeleton className={"w-20 h10"} />
                </>
            )}
        </div>
    )
}