import React,{useState} from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Header/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Components/store/CartProvider";

function App() {
  const [isCartOpen,setIsCartOpen]=useState(false);
  const showCartHandler=()=>{
    setIsCartOpen(true);
  }
  const hideCartHandler=()=>{
    setIsCartOpen(false);
  }
  
  return (
    <CartProvider>
      {isCartOpen && <Cart onClose={hideCartHandler}/>}
      <Header onShow={showCartHandler}/>
      <main>
      <Meals/>
      </main>
      
    </CartProvider>
  );
}

export default App;
