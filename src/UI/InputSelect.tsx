import { UseFormRegisterReturn } from "react-hook-form"

type Props = {
	label: string,
	form: string,
	options: string[]|number[],
	register?: UseFormRegisterReturn
}

const UIInputSelect:React.FC<Props> = ({label, form, options, register}) => {
	return (
		<div id="form-control" className="form__form-control">
			<label htmlFor={label} className="hidden">
				{label}
			</label>
			<select
				id={label}
				form={form}
				className="w-full px-4 py-2 text-xs text-gray-400 border border-gray-500/30 outline-1 outline-gray-400"
				{...register}
			>
				{options.map((opt) => {
					return (
						<option key={opt} value={opt}>
							{opt}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default UIInputSelect
