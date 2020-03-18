import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.module.css';
const checkoutSummary = (props) =>{
    return (
        <div className={cssClasses.CheckoutSummary}>
            <h1>Your Burger looks like shit</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type='Danger' click={props.cancel}>CANCEL</Button>
            <Button type='Success' click={props.continue}>CONTINUE</Button>
        </div>
    )
}
export default checkoutSummary;