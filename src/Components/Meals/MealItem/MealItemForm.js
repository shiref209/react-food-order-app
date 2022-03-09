import React,{useRef,useState} from "react";
import Input from "../../UI/Input";
import classes from './MealItemForm.module.css';



const MealItemForm=props=>{
    const amountInputRef=useRef();
    const [inputIsValid,setInputIsValid]=useState(true);
    const formSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmountInput=+amountInputRef.current.value;
        if (enteredAmountInput > 5 
        || enteredAmountInput < 1)
        {
            setInputIsValid(false)
            return;
        }
        props.onAddCart(enteredAmountInput)
    }
    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <Input 
            ref={amountInputRef}
            label='Amount'
            input={{
                id:'amount_'+props.id,
                type:'number',
                min:'1',
                max:'5',
                defaultValue:'1',
                step:'1'
            }} />
            <button >+ Add</button>
            {!inputIsValid && <span>Enter Valid Amount 1-5</span>}
        </form>
    )
}

export default MealItemForm;