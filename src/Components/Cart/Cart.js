import {useContext,useState} from "react";
import CartContext from "../store/cart-context";
import classes from './Cart.module.css';
import Modal from "./Modal";
import CartItem from './CartItem'
import Checkout from "./Checkout";


const Cart=props=>{
    const [orderIsClicked,setOrderIsClicked]=useState(false)
    const cartCtx=useContext(CartContext);
    const totalAmount=cartCtx.totalAmount.toFixed(2);
    const hasItems=cartCtx.items.length>0;

    const addItemHandler=item=>{
        cartCtx.addItem({...item,amount:1})
    };
    const removeItemHandler=id=>{
        cartCtx.removeItem(id)
    }

    const orderHandler=event=>{
        setOrderIsClicked(true);
    }
    const collectUserData=userData=>{
        fetch('https://food-order-app-b78a1-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                order:cartCtx.items
            })
        })
    }
    
    const cartItems=<ul className={classes['cart-items']}>
        {cartCtx.items.map(item=>(<CartItem
        key={item.id}
        price={item.price}
        amount={item.amount}
        name ={item.name}
        onRemove={removeItemHandler.bind(null, item.id)}
        onAdd={addItemHandler.bind(null,item)}
        />))}
    </ul>
    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
            {orderIsClicked &&<Checkout onCancel={props.onClose} onConfirm={collectUserData}/>}
        </div>
        
    </Modal>
}

export default Cart;