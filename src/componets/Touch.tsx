import { Div } from "./styles";

interface touchProps{
    text:string;
    type:string;
    handleclick?:(text:string) => void; 
}

export default function Touch({text,type,handleclick} : touchProps){
    const executeHandle = (text:string) =>{
        if(handleclick){
            handleclick(text);
        }
    }
    return (
        <Div $type={type} onClick={() => executeHandle(text)}>
            {text}
        </Div>
    )
}