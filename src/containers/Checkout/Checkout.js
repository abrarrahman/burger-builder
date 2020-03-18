import React, {Component} from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {
    // state={
    //     ingredients: null,
    //     price: null
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    // componentDidMount(){
    //     const queryParams = queryString.parse(this.props.location.search); 
    //     const passedIngredients = {}; 
    //     let price = null;
    //     for(let param of Object.entries(queryParams)){
    //         if(param[0]==='price'){
    //             price= param[1];
    //         }
    //         else{
    //             passedIngredients[param[0]]=parseInt(param[1]);
    //         }
    //     }
    //     this.setState({ingredients: passedIngredients, price: price});

    //     // const query = new URLSearchParams(this.props.location.search);
    //     // const ingredients = {};
    //     // for (let param of query.entries()) {
    //     //     // ['salad', '1']
    //     //     ingredients[param[0]] = +param[1];
    //     // }
    // }
    render(){
        
        return(
            <div>
                {this.props.ingredients?
                    <CheckoutSummary 
                        ingredients={this.props.ingredients} 
                        cancel={this.checkoutCancelledHandler}
                        continue={this.checkoutContinuedHandler}
                    />:<Spinner/>}
                <Route 
                    path={this.props.match.url+'/contact-data'} 
                    component={ContactData}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}
export default connect(mapStateToProps)(Checkout);