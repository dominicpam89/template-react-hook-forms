import UIFormTitle from "../UI/FormTitle"
import UIFormGroup from "../UI/FormGroup"
import UIInputText from "../UI/InputText"
import UIInputSelect from "../UI/InputSelect"
import UIInputTextArea from "../UI/InputTextArea"
import * as Utils from "./../utils/validation.form.complaint"
import { useForm, FieldValues, useFieldArray, FieldErrors } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import UIButton from "../UI/Button"

const FormComplaint = () => {
	const ageOptions = ["<12", "12-18", "19-24", "25-35"]
	const { control, register, handleSubmit, reset, watch, getValues, setValue, formState } = useForm({
		defaultValues: {
			name: { firstName: "Adam", lastName: "Smith" },
			username: "",
			age: "<12",
			complaint: "Nothing to complaint!",
			phones: [{ number: "+31" }],
		},
	})
	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}
  const onError = (errors:FieldErrors<FieldValues>)=>{
    console.log(errors)
  }
  const {errors } = formState
	const { fields, append, remove } = useFieldArray({ control: control, name: "phones" })
  return (
		<>
			<UIFormTitle title="Form Complaint" />
			<form id="formComplaint" className="w-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit,onError)}>
				<UIFormGroup>
					<UIInputText
						label="firstName"
						placeholder="First Name"
						register={register("name.firstName", Utils.validateFirstName)}
            error={errors.name?.firstName}
					/>
					<UIInputText
						label="lastName"
						placeholder="Last Name"
						register={register("name.lastName", Utils.validateLastName)}
            disabled={watch("name.firstName")===""}
            error={errors.name?.lastName}
          />
				</UIFormGroup>
				<UIFormGroup>
					<UIInputText
						label="username"
						placeholder="Username"
						register={register("username", Utils.validateUsername)}
            error={errors.username}
          />
					<UIButton text="Generate" fullWidth={false} onClick={() => Utils.generateUsername(getValues, setValue)} />
				</UIFormGroup>
				<UIInputSelect
					form="formComplaint"
					label="age"
					options={ageOptions}
					register={register("age", {
						required: "required!",
					})}
				/>
				<UIFormGroup row={false}>
					{fields.map((field, index) => {
						return (
							<div key={field.id} className="flex flex-row space-x-2">
								<UIInputText
									label={`phone ${index + 1}`}
									placeholder={`Phone ${index + 1}`}
									register={register(`phones.${index}.number`, Utils.validatePhones)}
                  error={errors.phones?.[index]?.number}
								/>
								{index !== 0 && (
									<UIButton
										text="Remove"
										variants="outlined"
										fullWidth={false}
										onClick={() => remove(index)}
									/>
								)}
							</div>
						)
					})}
					<UIButton text="Add Phone" variants="outlined" fullWidth onClick={() => append({ number: "+31" })} />
				</UIFormGroup>
				<UIInputTextArea label="complaint" placeholder="Complaint" rows={5} register={register("complaint")} />
				<UIFormGroup>
					<UIButton variants="outlined" text="Reset" onClick={() => reset()} />
					<UIButton variants="contained" text="Submit" type="submit" />
				</UIFormGroup>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default FormComplaint
