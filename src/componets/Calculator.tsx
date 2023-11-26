import { useState } from "react";
import { buttons } from "../data/buttons_data";
import { Buttons, CalculatorInterface, Visor } from "./styles";
import Touch from "./Touch";

export default function Calculator(){
    const lst = buttons;
    const [currentValue, SetcurrentValue] = useState('0');
    const [currentOperation, SetcurrentOperation] = useState(' ');
    const op = ['+','-','/','*','%'];

    const resolveExpression = (expression:string) =>{
        const res = eval(expression.toString());
        SetcurrentOperation(' ');
        SetcurrentValue(res);
    }

    const handleNumber = (value:string) => {
        if(currentValue === '0' || currentValue === 'Infinity'){
            SetcurrentValue(value)
        }else{
            SetcurrentValue(currentValue+value);
        }
    }
    const handleOperation = (value:string) =>{
        if(value === 'C'){
            SetcurrentValue('0');
            SetcurrentOperation(' ');
        }
        else if(value === 'DEL'){
            if(currentValue.length === 1){
                SetcurrentValue('0');
            }else{
                SetcurrentValue(currentValue.slice(0,-1));
            }
        }else if(value === '='){
            const last = currentOperation[currentOperation.length-1]
            op.includes(last)?
            resolveExpression(currentOperation+currentValue)
            :resolveExpression(currentOperation);   
        }else{
            if(currentOperation === ' '){
                SetcurrentOperation(currentValue + value);
            }else{
                const last = currentOperation[currentOperation.length-1]
                if(op.includes(last) && op.includes(value)){
                    SetcurrentOperation(currentOperation+currentValue)
                }else{
                    SetcurrentOperation(currentOperation+ value + currentValue);
                }
            }
            SetcurrentValue('0');
        }
    }
    return (
        <CalculatorInterface>
            <Visor>
                <p>{currentOperation}</p>
                <p>{currentValue}</p>
            </Visor>
            <Buttons>
                {lst.map((button) => {
                    return <Touch {...button} handleclick={button.type === 'number' ? 
                handleNumber : handleOperation}/>
                })}
            </Buttons>
        </CalculatorInterface>
    )
}