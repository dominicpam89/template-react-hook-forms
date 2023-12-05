import { UseFormRegisterReturn, FieldError } from "react-hook-form"

type Props = {
  label: string,
  placeholder: string,
	disabled?: boolean,
  type?:React.HTMLInputTypeAttribute,
	register?: UseFormRegisterReturn,
	error?:FieldError|{status:boolean, message:string}|any
}

const UIInputText:React.FC<Props> = ({label, placeholder, type="text", register={}, error=undefined, disabled=false }) => {
	return (
		<>
			<div id="form-control" className="form__form-control">
				<label htmlFor={label} className="hidden">
					{placeholder}
				</label>
				<input type={type} id={label} placeholder={placeholder} className="form__input" {...register} disabled={disabled} />
				{error && <p className="text-rose-500 text-xs font-extralight">{error.message}</p>}
			</div>
		</>
	)
}

export default UIInputText
