import Icon from "./icon.tsx";
import CheckIcon from "../assets/icons/check.svg?react"
import {tv, type VariantProps} from "tailwind-variants";

export const inputCheckboxWrapperVariant = tv({
    base: "inline-flex items-center justify-center relative group"
})

export const inputCheckboxVariants = tv({
    base: "appearance-none peer flex items-center justify-center cursor-pointer transition overflow-hidden",
    variants: {
        variant: {
            default: `
                border-2 border-solid border-border-primary hover:border-border-active
                checked:border-accent-brand checked:bg-accent-brande
                group-hover:checked:border-accent-brand-light
                group-hover:checked:bg-accent-brand-light
            `
        },
        size: {
            sm: "h-3 w-3 rounded-sm",
            md: "h-5 w-5 rounded-sm"
        },
        disabled: {
            true: "pointer-event-none"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md",
        disabled: false
    }
});

export const inputCheckboxInconVariants = tv({
    base: "absolute top-1/2 -translate-y-1/2 hidden peer-checked:block fill-white cursor-pointer",
    variants: {
        size: {
            sm: "w-3 h-3 left-px",
            md: "w-4 h-4 left-0.5"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

interface InputCheckboxProps extends VariantProps<typeof inputCheckboxVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {

}

export default function InputCheckbox({variant, size, disabled, className, ...props}: InputCheckboxProps) {
    return (
        <label className={inputCheckboxWrapperVariant({ className })}>
            <input type={"checkbox"} className={inputCheckboxVariants({ variant , size, disabled })} {...props}/>
            <Icon svg={CheckIcon} className={inputCheckboxInconVariants({ size })} />
        </label>
    )
}