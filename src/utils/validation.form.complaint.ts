import { RegisterOptions, UseFormGetValues, UseFormSetValue } from "react-hook-form"

type Fields = {
	name: {
		firstName: string
		lastName: string
	}
	username: string
	age: string
	complaint: string
	phones: {
		number: string
	}[]
}

const validateFirstName: RegisterOptions = {
	required: "Required!",
	pattern: {
		value: /[\w]{3,}/,
		message: "minimum 3 chars",
	},
}

const validateLastName: RegisterOptions = {
	required: "required!",
	validate: {
		base: (val) => val.length > 3 || "minimum 3 chars",
	},
}

const validateUsername: RegisterOptions = {
	required: "required!",
	pattern: {
		value: /^@[\w]*[0-9]{3,}[\w]*/g,
		message: "start with @ following words, include 3 numbers!",
	},
}

const validatePhones: RegisterOptions = {
	validate: {
		base: (val) => {
			if (val.length > 0 && val.startsWith("+31") && val.length > 11) {
				return true
			} else return "number must start with +31 and minimum 11"
		},
	},
}

const validateAge: RegisterOptions = {
	required: "required!",
}

const generateUsername = (getValues:UseFormGetValues<Fields>, setValue:UseFormSetValue<Fields>) => {
	const firstName = getValues("name.firstName")
	if (firstName.length === 0)
		setValue("username", `@user${Math.round(Math.random() * 1000)}`, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
	else
		setValue("username", `@${firstName}${Math.round(Math.random() * 1000)}`, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
}

export { validateFirstName, validateLastName, validatePhones, validateUsername, validateAge, generateUsername }
