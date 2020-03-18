import React from 'react';
import cssClasses from './BuildControl.module.css'

const buildControl = props => (
    <div className={cssClasses.BuildControl}>
        <div className={cssClasses.Label}>{props.label}</div>
        <button 
            className={cssClasses.Less} 
            onClick={props.remove} 
            disabled={props.inactive}>
            Less
        </button>
        <button 
            className={cssClasses.More} 
            onClick={props.add}>
            More
        </button>
    </div>
);

export default buildControl;