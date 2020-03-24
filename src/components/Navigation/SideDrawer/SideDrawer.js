import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Aux'
import cssClasses from './SideDrawer.module.css'
const sideDrawer = props => {
    const sideDrawerClasses = [cssClasses.SideDrawer];
    if(props.open){
        sideDrawerClasses.push(cssClasses.Open);
    }else{
        sideDrawerClasses.push(cssClasses.Close);
    }
    return(
        <Aux>
            <Backdrop show={props.open} click={props.close}/>
            <div className={sideDrawerClasses.join(' ')} onClick={props.close}> 
                <div className={cssClasses.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}
export default sideDrawer;