export const validationName = {
	required: "first name is required",
	pattern: {
		value: /[\w]{3,}/g,
		message: "Minimum 3 chars",
	},
}

export const validationAge = {
	required: "Age is required",
	valueAsNumber: true,
	min: {
		value: 18,
		message: "Must be over 18",
	},
}

export const validationAddressFirst = {
	required: "required!",
	validate: {
		minimum: (val: string) => val.length > 5 || "Address is not valid",
	},
}

export const validationAddress = {
	validate: {
		minimum: (val: string) => val.length > 5 || "Address is not valid",
	},
}

export const validationUsername = {
	pattern: {
		value: /@[\w]{3,}/g,
		message: `username must started with @ ${(<br></br>)}and minimum 3 chars`,
	},
}

export const validationTwitter = {
	pattern:{
		value: /twitter.com\/@[\w]+/g,
		message: "must be started with twitter.com/@"
	}
}

export const validationTiktok = {
	pattern:{
		value: /tiktok.com\/@[\w]+/g,
		message: "must be started with tiktok.com/@"
	}
}