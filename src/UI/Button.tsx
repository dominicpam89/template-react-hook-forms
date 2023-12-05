type Props = {
  text: string,
  type?: "button" | "submit" | "reset" | undefined,
	variants?: "outlined"|"contained"|"text",
	fullWidth?: boolean,
  onClick?: ()=>void,
}

const UIButton:React.FC<Props> = ({text, onClick=()=>{},type="button", variants="contained", fullWidth=true}) => {
	const twClasses = {
		outlined: `${fullWidth?"w-full":""} px-2 py-1 mt-2 border border-emerald-600 text-emerald-600 text-xs`,
		contained: `${fullWidth?"w-full":""} px-2 py-1 mt-2 bg-emerald-700 text-white text-xs`,
		text: `${fullWidth?"w-full":""} px-2 py-1 mt-2 text-emerald-600 text-xs`
	}

	const getClass = ()=>{
		if(variants==="contained") return twClasses.contained
		else if(variants==="outlined") return twClasses.outlined
		else return twClasses.text
	}

	return (
		<button className={getClass()} type={type} onClick={onClick}>
			{text}
		</button>
	)
}

export default UIButton
