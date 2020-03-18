import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import cssClasses from './Logo.module.css'
const logo = props => (
    <div className={cssClasses.Logo}>
        <img src={burgerLogo} alt='Burger Builder'/>
    </div>
)
export default logo;