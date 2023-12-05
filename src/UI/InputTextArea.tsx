import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
  label: string,
  placeholder: string,
	rows?: number
	register?:UseFormRegisterReturn
}

const UIInputTextArea:React.FC<Props> = ({label, placeholder, rows=3, register={}}) => {
	return (
		<>
			<div id="form-control" className="form__form-control">
				<label htmlFor={label} className="hidden">
					{placeholder}
				</label>
				<textarea id={label} placeholder={placeholder} rows={rows} className="form__input" {...register} />
			</div>
		</>
	)
}

export default UIInputTextArea
