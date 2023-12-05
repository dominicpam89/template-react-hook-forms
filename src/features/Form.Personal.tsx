import UIInputText from "../UI/InputText"
import UIInputTextArea from "../UI/InputTextArea"
import { DevTool } from "@hookform/devtools"
import { useForm, useFieldArray, FieldValues } from "react-hook-form"

const phoneNumberValidation = /\+31[0-9]{11}$/g

const FormPersonal = () => {
	const { control, handleSubmit, register, formState:{errors} } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			bio: "",
			phones: [{ number: "+31" }],
			social: {
				twitter: "",
				facebook: "",
			},
		},
	})
	const { fields: phones, append, remove } = useFieldArray({ name: "phones", control })
	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}
	return (
		<>
			<h1 className="font-extrabold text-md text-center">Personal Information Form</h1>
			<form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<UIInputText
					label="firstName"
					placeholder="First Name"
					register={register("firstName", {
						required: "required!",
						validate: {
							base: (val) => val.length > 3 || "must be more than 3 chars",
						},
					})}
          error={errors?.firstName}
				/>
				<UIInputText
					label="lastName"
					placeholder="Last Name"
					register={register("lastName", {
						required: "required!",
						validate: {
							base: (val) => val.length > 3 || "must be more than 3 chars",
						},
					})}
          error={errors.lastName}
				/>
				<UIInputTextArea label="bio" placeholder="Your Bio" rows={3} register={register("bio")} />
				<div className="flex flex-col space-y-2">
					{phones.map((phone, index) => {
						return (
              <div key={phone.id} className="flex flex-row items-stretch">
                <UIInputText
                  label={`phone${index + 1}`}
                  placeholder={`Phone ${index + 1}`}
                  register={register(`phones.${index}.number`,{
                    pattern: {
                      value: phoneNumberValidation,
                      message: "Phone number must be (11) numbers and start with +31"
                    },
                  })}
                />
                {index!==0 && <button className="px-2 bg-slate-300" onClick={()=>remove(index)}>-</button>}
              </div>
						)
					})}
          <button className="py-1 rounded-sm bg-sky-700 text-gray-100 text-[12px] font-thin" onClick={()=>append({number:"+31"})}>+ Add Phone Number</button>
				</div>
				<div className="flex flex-row space-x-2">
					<UIInputText label="twitter" placeholder="Twitter" register={register("social.twitter")} />
					<UIInputText label="facebook" placeholder="Facebook" register={register("social.facebook")} />
				</div>
        <div id="button-group" className="flex flex-col space-y-1">
          <button className="btn-submit" type="submit">
            Submit
          </button>
          <button className="btn-reset" type="button">
            Reset
          </button>
        </div>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default FormPersonal
