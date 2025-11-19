import Button from "./components/button.tsx";
import ButtonIcon from "./components/button-icon.tsx";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge.tsx";
import Alert from "./components/alert.tsx";
import Divider from "./components/divider.tsx";
import InputText from "./components/input-text.tsx";
import SeachIcon from "./assets/icons/search.svg?react";
import InputCheckbox from "./components/input-checkbox.tsx";
import InputSingleFile from "./components/input-single-file.tsx";
import {useForm} from "react-hook-form";

export default function App() {
	const form = useForm();

    return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>

            <div>
                <InputText icon={SeachIcon} placeholder={"Buscar foto"} />
            </div>

            <div>
                <InputCheckbox />
            </div>

            <div>
                <InputSingleFile form={form} {...form.register("file")}/>
            </div>
		</div>
	);
}
