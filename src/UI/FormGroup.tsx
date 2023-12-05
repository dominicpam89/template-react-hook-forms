type Props = {
	children: React.ReactNode
	row?: boolean,
	twClass?: string,
}

const UIFormGroup: React.FC<Props> = ({ children, row = true, twClass="" }) => {
	const twClasses = {
		row: `flex flex-row space-x-2`,
		col: `flex flex-col space-y-2`,
	}
	return (
		<div id="form-group" className={`${row ? twClasses.row : twClasses.col} ${twClass}`}>
			{children}
		</div>
	)
}

export default UIFormGroup
