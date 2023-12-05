import { useEffect } from "react"
import UIFormTitle from "../UI/FormTitle"
import UIInputText from "../UI/InputText"
import { useForm, FieldValues, useFieldArray } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import {
	validationName,
	validationAge,
	validationAddressFirst,
	validationAddress,
	validationUsername,
	validationTwitter,
	validationTiktok,
} from "../utils/validation.form.personal.advance"

const FormPersonalAdvance = () => {
	const {
		control,
		reset,
		handleSubmit,
		register,
		watch,
		formState: { errors },
    getValues,
    setValue,
	} = useForm({
		defaultValues: {
			name: {
				firstName: "john",
				lastName: "smith",
			},
			age: 18,
			address: [{ address: "some address in Louisiana" }],
			username: "@username",
			social: {
				twitter: "twitter.com/@johnsmith",
				tiktok: "tiktok.com/@johnsmith",
			},
		},
	})
	const { fields: addressFields, append, remove } = useFieldArray({ control, name: "address" })
	useEffect(() => {
		const subs = watch((val) => console.log(val))
		return () => subs.unsubscribe()
	}, [])
	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}
	return (
		<>
			<UIFormTitle title="Form Personal Advance" />
			<form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div id="form-group" className="flex flex-row space-x-2">
					<UIInputText
						label="firstName"
						placeholder="First Name"
						register={register("name.firstName", validationName)}
						error={errors?.name?.firstName}
					/>
					<UIInputText
						label="lastName"
						placeholder="Last Name"
						register={register("name.lastName", validationName)}
						error={errors?.name?.lastName}
					/>
				</div>
				<UIInputText label="age" placeholder="Your Age" type="number" register={register("age", validationAge)} />
				<div id="form-group" className="flex flex-col space-y-2">
					{addressFields.map((field, index) => {
						return (
              <div className="flex flex-row space-x-2" key={field.id}>
                <UIInputText
                  label={`address ${index + 1}`}
                  placeholder={`Address ${index + 1}`}
                  register={register(`address.${index}.address`, index===0?validationAddressFirst:validationAddress)}
                  error={errors?.address?.[index]}
                />
                {index!==0&&<button className="px-3 mt-2 rounded-sm bg-rose-500 text-white text-xs font-extralight" type="button" onClick={()=>remove(index)}>remove</button>}
              </div>
						)
					})}
					<button className="p-2 rounded-sm bg-blue-500 text-white text-xs font-extralight" type="button" onClick={() => append({ address: "" })}>
						Add Address
					</button>
				</div>
        <div id="form-group" className="flex flex-row space-x-2 items-stretch">
          <UIInputText
            label="username"
            placeholder="Your Username"
            register={register("username", validationUsername)}
            error={errors.username}
          />
          <button className="px-4 mt-2 rounded-sm bg-violet-600/80 text-white text-xs" onClick={()=>{
            setValue("username",`@${getValues("name.firstName")}${Math.round(Math.random()*1000)}`,{
              shouldDirty: true,
              shouldValidate: true,
            })
          }}>Generate</button>
        </div>
				<div id="form-group" className="flex flex-col space-y-2">
					<UIInputText
						label="twitter"
						placeholder="Twitter"
						register={register("social.twitter", validationTwitter)}
						error={errors.social?.twitter}
					/>
					<UIInputText
						label="tiktok"
						placeholder="Tiktok"
						register={register("social.tiktok", validationTiktok)}
						error={errors.social?.tiktok}
					/>
				</div>
				<button className="btn-submit" type="submit">
					Submit
				</button>
        <button className="btn-submit bg-slate-900 text-white" type="button" onClick={()=>{
          console.log(getValues(["social", "address"]))
        }}>
          Get Values
        </button>
				<button className="btn-reset" type="button" onClick={() => reset()}>
					Reset
				</button>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default FormPersonalAdvance
