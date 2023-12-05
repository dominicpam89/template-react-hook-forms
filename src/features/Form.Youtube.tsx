import {} from "react"
import { useForm, FieldValues } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

const FormYoutube = () => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "@silit",
			email: "silit@example.com",
			channel: "youtube.com/c/silit123",
			social: {
				twitter: "@silit123",
				facebook: "facebook.com/p/silit90",
			},
      phoneNumbers:["+31","+31"]
		},
	})
	const onSubmit = (data: FieldValues) => {
		console.log(data)
	}
	return (
		<>
			<h1 className="font-extrabold text-md text-center">Youtube Form</h1>
			<form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
				<div id="form-control" className="form__form-control">
					<label htmlFor="username" className="hidden">
						Username
					</label>
					<input
						type="text"
						id="username"
						placeholder="Your Username"
						className="form__input"
						{...register("username", {
							required: "username is required!",
							minLength: {
								value: 3,
								message: "minimum 3 characters",
							},
							validate: {
								base: (val: string) => val.startsWith("@") || "Must starts with @",
							},
						})}
					/>
					{errors?.username && (
						<p className="text-rose-500 text-xs font-extralight">{errors.username?.message?.toString()}</p>
					)}
				</div>
				<div id="form-control">
					<label htmlFor="email" className="hidden">
						Email
					</label>
					<input
						type="text"
						id="email"
						placeholder="Your email"
						className="form__input"
						{...register("email", {
							required: "email is required!",
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
								message: "Invalid email address",
							},
						})}
					/>
					{errors?.email && (
						<p className="text-rose-500 text-xs font-extralight">{errors.email?.message?.toString()}</p>
					)}
				</div>
				<div id="form-control">
					<label htmlFor="channel" className="hidden">
						channel
					</label>
					<input
						type="text"
						id="channel"
						placeholder="Your channel"
						className="form__input"
						{...register("channel", {
							required: "channel is required!",
							validate: {
								base: (val) => val.startsWith("youtube.com/c/") || "invalid channel",
							},
						})}
					/>
					{errors?.channel && (
						<p className="text-rose-500 text-xs font-extralight">{errors.channel?.message?.toString()}</p>
					)}
				</div>
				<div id="form-control">
					<label htmlFor="twitter" className="hidden">
						twitter
					</label>
					<input
						type="text"
						id="twitter"
						placeholder="Your twitter"
						className="form__input"
						{...register("social.twitter")}
					/>
				</div>
				<div id="form-control">
					<label htmlFor="facebook" className="hidden">
						facebook
					</label>
					<input
						type="text"
						id="facebook"
						placeholder="Your facebook"
						className="form__input"
						{...register("social.facebook")}
					/>
				</div>
				<div id="form-group" className="flex flex-row space-x-2">
					<div id="form-control">
						<label htmlFor="phoneNumber1" className="hidden">
							Phone 1
						</label>
						<input
							type="text"
							id="phoneNumber1"
							placeholder="Your phoneNumber1"
							className="form__input"
							{...register("phoneNumbers.0")}
						/>
					</div>
					<div id="form-control">
						<label htmlFor="phoneNumber2" className="hidden">
							Phone 2
						</label>
						<input
							type="text"
							id="phoneNumber2"
							placeholder="Your phoneNumber2"
							className="form__input"
							{...register("phoneNumbers.1")}
						/>
					</div>
				</div>
				<button className="btn-submit" type="submit">
					Submit
				</button>
				<button className="btn-reset" type="button" onClick={() => reset()}>
					Reset
				</button>
			</form>
			<DevTool control={control} />
		</>
	)
}

export default FormYoutube
