import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Aux';
import cssClasses from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer: true
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState=>({showSideDrawer: !prevState.showSideDrawer}));
    }
    render(){
        return(
            <Aux>
                <Toolbar
                    openSideDrawer={this.sideDrawerToggleHandler} 
                />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    close={this.sideDrawerToggleHandler}
                />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;