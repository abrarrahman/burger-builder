import React from 'react';
import cssClasses from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger = props => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(parseInt(props.ingredients[igKey]))]
                .map((_,index)=>{
                    return <Ingredient key={igKey+index} type={igKey}/>;
                });
    }).flat();
    if(!ingredientsArray.length){
        ingredientsArray = <p>Please start adding your ingredients</p>
    }
    return(
        <div className={cssClasses.Burger}>
        <Ingredient type="bread-top"/>
            {ingredientsArray}
        <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;