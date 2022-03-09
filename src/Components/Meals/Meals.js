import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals=props=>{
    return <React.Fragment>
        <main>
            <MealsSummary/>
            <AvailableMeals/>
        </main>
    </React.Fragment>
}

export default Meals;