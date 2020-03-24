import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'
import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    componentDidMount(){
        if(!this.props.building){
            this.props.onLoadIngredients();
        }
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        }else{
            this.props.history.push('/auth')
        }
    }
    updateBuiltState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(key=>ingredients[key])
            .reduce((sum,quantity)=>sum+quantity,0);
        return sum>0;
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    goToCheckoutHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    // goToCheckoutHandler = () => {
    //     const ingredients = this.state.ingredients;
    //     const queryParams = [];
    //     for (let param of Object.entries(ingredients)){
    //         queryParams.push(param[0]+'='+param[1])
    //     }
    //     queryParams.push('price='+this.state.totalPrice);
    //     // const queryParams = [];
    //     // for(let ig in this.props.ingredients){
    //     //     queryParams.push(encodeURIComponent(ig)+'='+encodeURIComponent(this.props.ingredients[ig]));
    //     // }
    //     // const queryString = queryParams.join('&');
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         // search: '?bacon='+bacon+'&cheese='+cheese+'&meat='+meat+'&salad='+salad
    //         search: '?' + queryString
    //     });
    // }
    
    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key]<=0);
        }
        let orderSummary =<OrderSummary 
                ingredients={this.props.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={()=>this.goToCheckoutHandler()}
                price={this.props.price}/>
        let burger = null;
        if(this.props.ingredients === null){
            burger = this.props.error? <h2>There was a problem loading ingredients!</h2>: <Spinner/>;
            orderSummary = null;
        } else { 
            burger =(
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdd={this.props.onAddIngredient} 
                        ingredientRemove={this.props.onRemoveIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        built={this.updateBuiltState(this.props.ingredients)}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
        }
        return<Aux>
                <Modal 
                    show={this.state.purchasing}
                    dismissModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token!==null,
        building: state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: type => dispatch(actionCreators.addIngredient(type)),
        onRemoveIngredient: type => dispatch(actionCreators.removeIngredient(type)),
        onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
        onInitPurchase: () => dispatch(actionCreators.initPurchase())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));