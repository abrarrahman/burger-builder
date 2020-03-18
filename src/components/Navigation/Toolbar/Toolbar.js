import React from 'react';
import cssClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = props => (
    <header className={cssClasses.Toolbar}>
        <DrawerToggle click={props.openSideDrawer}/>
        <div className={cssClasses.Logo}>
            <Logo />
        </div>
        <nav className={cssClasses.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)
export default toolbar;