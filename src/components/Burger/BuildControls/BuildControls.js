import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import cssClasses from './BuildControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = props => (
    <div className={cssClasses.BuildControls}>
        <h2>Tk {props.price}</h2>
        {controls.map(control=>(
            <BuildControl 
                key={control.label} 
                label={control.label}
                add={()=>props.ingredientAdd(control.type)} 
                remove={()=>props.ingredientRemove(control.type)}
                inactive={props.disabledInfo[control.type]}   
            />
        ))}
        <button 
            className={cssClasses.OrderButton} 
            disabled={!props.built} 
            onClick={props.order}>
            ORDER NOW
        </button>
    </div>
);

export default buildControls;