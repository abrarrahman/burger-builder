import React, { Component } from 'react';
import {connect} from 'react-redux';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
export class NavigationItems extends Component {
    render(){
        return (
            <ul className={cssClasses.NavigationItems}>
                <NavigationItem
                    link='/build'>
                    Burger Builder
                </NavigationItem>
                {this.props.isAuth? <NavigationItem
                    link='/orders'>
                    Orders
                </NavigationItem>: null}
                {!this.props.isAuth
                        ?<NavigationItem link='/auth'>Authenticate</NavigationItem>
                        :<NavigationItem link='/logout'>Logout</NavigationItem>}
                
            </ul>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(NavigationItems);