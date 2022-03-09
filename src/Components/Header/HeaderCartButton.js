import classes from './HeaderCartButton.module.css';
import CartIcon from './CartIcon';
import { useContext,useEffect,useState } from 'react';
import CartContext from '../store/cart-context';

const HeaderCartButton=props=>{
    const cartCtx=useContext(CartContext);
    const numberOfItems=cartCtx.items.reduce((currValue,item)=>{return currValue+item.amount},0);
    const [isBump,setIsBump]=useState(false);

    const buttonClasses=`${classes.button} ${isBump ? classes.bump : ''}`;
    const {items}=cartCtx
    
    useEffect(()=>{
        if (items.length===0){
            return;
        }
        setIsBump(true);
        const timer=setTimeout(()=>{
            setIsBump(false);
        },300)
        return ()=>{
            clearTimeout(timer);
        }
    },[items])

    return <button className={buttonClasses} onClick={props.onShow}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span> 
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfItems}
        </span>
    </button>
}

export default HeaderCartButton;