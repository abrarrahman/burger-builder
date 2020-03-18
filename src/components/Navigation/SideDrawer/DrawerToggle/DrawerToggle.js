import React from 'react';
import cssClasses from './DrawerToggle.module.css'
const drawerToggle = props => (
    <div onClick={props.click} className={cssClasses.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default drawerToggle;