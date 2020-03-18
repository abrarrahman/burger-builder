import React, { Component } from 'react';
import Aux from '../Auxiliary/Aux';
import cssClasses from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer: false
    }
    sideDrawerToggleHandler = () => {
        this.setState(prevState=>({showSideDrawer: !prevState.showSideDrawer}));
    }
    render(){
        return(
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerToggleHandler}/>
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;