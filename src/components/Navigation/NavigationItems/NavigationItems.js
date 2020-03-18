import React from 'react';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = props => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem
            link='/build'>
            Burger Builder
        </NavigationItem>
        <NavigationItem
            link='/orders'>
            Orders
        </NavigationItem>
    </ul>
)
export default navigationItems;