import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../actions'
import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response=>this.setState({ingredients: response.data}))
            .catch(error=>this.setState({error: true}))
    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
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
                price={this.props.price}    
            />
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        let burger =(
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    ingredientAdd={this.props.onAddIngredient} 
                    ingredientRemove={this.props.onRemoveIngredient}
                    disabledInfo={disabledInfo}
                    price={this.props.price}
                    built={this.updateBuiltState(this.props.ingredients)}
                    order={this.purchaseHandler}
                />
            </Aux>
        );
        if(!this.props.ingredients){
            burger = this.state.error? <h2>There was a problem loading ingredients!</h2>: <Spinner/>;
            orderSummary = null;
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
        ingredients: state.ingredients,
        price: state.price
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch({
            type: actionTypes.ADD_INGREDIENT, 
            ingredientName: type}),
        onRemoveIngredient: (type) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT, 
            ingredientName: type})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));