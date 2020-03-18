import React from 'react';
import { NavLink } from 'react-router-dom'
import cssClasses from './NavigationItem.module.css';
const navigationItem = props => (
    <li className={cssClasses.NavigationItem}>
        <NavLink
            to={props.link}
            activeClassName={cssClasses.active}
        >
            {props.children}
        </NavLink>
    </li>
)
export default navigationItem;