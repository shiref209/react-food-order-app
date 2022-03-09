import classes from './Checkout.module.css';
import {useRef,useState} from 'react'

const Checkout = (props) => {
    const [formValidity,setFormValidity]=useState({
        name:true,
        city:true,
        postal:true,
        street:true
    })
    const nameInputRef=useRef();
    const cityInputRef=useRef();
    const postalInputRef=useRef();
    const streetInputRef=useRef();

    const isEmpty=input=>input.trim()==='';
    const isFiveChars=input=>input.trim().length ===5;
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredNameInput=nameInputRef.current.value;
    const enteredCityInput=cityInputRef.current.value;
    const enteredPostalInput=postalInputRef.current.value;
    const enteredStreetInput=streetInputRef.current.value;

    const validName=!isEmpty(enteredNameInput);
    const validStreet=!isEmpty(enteredStreetInput);
    const validCity=!isEmpty(enteredCityInput);
    const validPostal=isFiveChars(enteredPostalInput);

    setFormValidity({
        name:validName,
        city:validCity,
        street:validStreet,
        postal:validPostal
    })

    const formIsValid=validCity && validName && validPostal && validStreet
    if (!formIsValid){
        return
    }
    props.onConfirm({
        name:enteredNameInput,
        city:enteredCityInput,
        street:enteredStreetInput,
        postal:enteredPostalInput
    })

  };
  const nameControl=`${classes.control} ${!formValidity.name ?classes.invalid : ''}`
  const cityControl=`${classes.control}  ${!formValidity.city ?classes.invalid : ''}`
  const streetControl=`${classes.control}  ${!formValidity.street ?classes.invalid : ''}`
  const postalControl=`${classes.control}  ${!formValidity.postal ?classes.invalid : ''}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formValidity.name &&<p>Please Enter Valid Input</p>}
      </div>
      <div className={streetControl}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formValidity.street &&<p>Please Enter Valid Input</p>}
      </div>
      <div className={postalControl}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formValidity.postal &&<p>Please Enter Valid Input</p>}
      </div>
      <div className={cityControl}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValidity.city &&<p>Please Enter Valid Input</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;