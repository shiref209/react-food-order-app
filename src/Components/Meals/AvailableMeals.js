import {useEffect,useState} from "react";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals=(props)=>{     
  const [meals,setMeals]=useState([])
  const [isLoading,setIsLoading]=useState(true);
  const [mealError,setMealError]=useState()
  const loadingData=isLoading? <p className={classes.loadingData}>Loading...</p> : '';
  const mealLoadingError=mealError? <p className={classes.loadingData}>Error! {mealError}</p> : '';
  useEffect(()=>{
    const getMeals=async ()=>{
      const response=await fetch('https://food-order-app-b78a1-default-rtdb.firebaseio.com/meals.json');
      const mealsData=await response.json();
      let updatedMeals=[];
      for (const key in mealsData){
        updatedMeals.push({
          id:key,
          name:mealsData[key].name,
          price:mealsData[key].price,
          description:mealsData[key].description
        })
      }
      setMeals(updatedMeals);
      setIsLoading(false)
    }
    getMeals().catch(error=>{
      setMealError(error.message)
      console.log(error);
    });
  },[])
  const mealItem=meals.map(meal=>{

    return (
        <MealItem
        name={meal.name}
        description={meal.description}
        price={meal.price}
        key={meal.id}
        id={meal.id} />
    )
    });

    return(
        <section className={classes.meals}>
          {loadingData}
          {mealLoadingError}
        <Card>
          
            <ul>
                {mealItem}
            </ul>
        </Card>
    </section>
    

    )}

export default AvailableMeals;