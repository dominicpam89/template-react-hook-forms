type Props = {
  title: string
}

const UIFormTitle:React.FC<Props> = ({title}) => {
  return <h1 className="font-extrabold text-md text-center">{title}</h1>
}
 
export default UIFormTitle;