import React from 'react';
import Aux from '../../../hoc/Auxiliary/Aux';
import Button from '../../UI/Button/Button'
const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key=>props.ingredients[key]?
        <li key={key}>
            <span 
                style={{textTransform: "capitalize"}}>
                {key}
            </span>
            :{props.ingredients[key]}
        </li>:null)
    return <Aux>
        <h3>Your Order</h3>
        <p>The burger you configured contains:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <h4>Price: Tk {props.price}</h4>
        <p>Would you like to continue to checkout?</p>
        <Button type='Danger' click={props.cancel}>CANCEL</Button>
        <Button type='Success' click={props.continue}>CONTINUE</Button>
    </Aux>
}
export default orderSummary;