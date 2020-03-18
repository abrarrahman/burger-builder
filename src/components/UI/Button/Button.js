import React from 'react';
import cssClasses from './Button.module.css'
const button = props => (
    <button
        className={[cssClasses.Button,cssClasses[props.type]].join(' ')}
        onClick={props.click}
        disabled={props.disabled}>
        {props.children}
    </button>
)
export default button;