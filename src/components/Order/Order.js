import React from 'react';
import cssClasses from './Order.module.css';
const order = ({ingredients,price}) => {
    const itemStyles = {
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }
    const itemList = Object.entries(ingredients).map(param=>(
        param[1]?
            <span 
                key={param[0]} 
                style={itemStyles}
            >
                {param[0]+'('+param[1]+')'}
            </span>:
            null
    ));
    return <div className={cssClasses.Order}>
        <p>Ingredients : {itemList}</p>
        <p>Price: <strong>Tk {price}</strong></p>
    </div>
}

export default order;