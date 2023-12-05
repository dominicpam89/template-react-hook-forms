import UIFormTitle from "../UI/FormTitle"
import UIInputText from "../UI/InputText"
import UIInputTextArea from "../UI/InputTextArea"
import { utilsDatePicker as datePicker } from "../utils/datepicker"
import { DevTool } from "@hookform/devtools"
import { useForm, useFieldArray, FieldValues } from "react-hook-form"

const FormDate = () => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: {
				firstName: "",
				lastName: "",
			},
			dateComplete: "",
			phones: [{ number: "+31" }],
			feedback: "",
		},
	})

	const { fields: phones, append, remove } = useFieldArray({ name: "phones", control })

	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}
	return (
		<>
			<UIFormTitle title="Form Date" />
			<form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div id="form-group" className="flex flex-row space-x-2">
					<UIInputText
						label="firstName"
						placeholder="First Name"
						register={register("name.firstName", {
							required: "Required",
							pattern: {
								value: /[\w]{3,}/,
								message: "Minimum 3 chars"
							}
						})}
						error={errors?.name?.firstName}
					/>
					<UIInputText
						label="lastName"
						placeholder="Last Name"
						register={register("name.lastName", {
							required: "Required",
							pattern: {
								value: /[\w]{3,}/,
								message: "Minimum 3 chars"
							}
						})}
						error={errors?.name?.lastName}
					/>
				</div>
				<div id="form-control" className="form__form-control">
					<label htmlFor="completed" className="text-xs text-gray-500 ml-1">
						Project Completed:
					</label>
					<input
						type="date"
						id="completed"
						min={datePicker.min.toDateString()}
						max={datePicker.max.toDateString()}
						className="form__input"
						{...register("dateComplete", {
							required: "Please input date!",
						})}
					/>
					{errors?.dateComplete && <p className="text-rose-500 text-xs font-extralight">{errors?.dateComplete.message}</p>}
				</div>
				<div id="form-group" className="flex flex-col space-y-2">
					{phones.map((phone, index) => {
						return (
							<div className="flex flex-row space-x-1 items-stretch">
								<UIInputText
									key={phone.id}
									label={`phone${index+1}`}
									placeholder={`Phone ${index+1}`}
									register={register(`phones.${index}.number`, {
										pattern: {
											value: /\+31[0-9]{11}/g,
											message: "Phone number is invalid",
										},
									})}
									error={errors?.phones?.[index]?.number}
								/>
								{index>0 && <button className="px-2 py-1 mt-2 rounded-sm border border-indigo-800/30 font-medium text-xs text-indigo-400" onClick={()=>remove(index)}>Remove</button>}
							</div>
						)
					})}
					<button className="py-1 text-xs bg-slate-600 text-white" onClick={()=>append({number:"+31"})}>Add Phone</button>
				</div>
				<UIInputTextArea label="feedback" placeholder="Feedback" rows={5} register={register("feedback")} />
				<div id="button-group" className="flex flex-col space-y-1">
					<button className="btn-submit" type="submit">
						Submit
					</button>
					<button className="btn-reset" type="button" onClick={() => reset()}>
						Reset
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default FormDate
