import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input'
import cssClasses from './ContactData.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {checkValidation} from '../../shared/utility'

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your real name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tell me where you live'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "...and which city that's in"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your actual E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            mobile: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Where you want to enjoy our ads'
                },
                value: '',
                validation: {
                    minLength: 11,
                    maxLength: 12
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formItem in this.state.orderForm){
            formData[formItem] = this.state.orderForm[formItem].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            formData: formData,
            userId: this.props.userId
        };
        this.props.onPlaceOrder(order,this.props.token);
    }
    inputChangedHandler = (event,formItem) => {
        const updatedForm = {...this.state.orderForm}
        const updatedItem = {...this.state.orderForm[formItem]};
        updatedItem.value = event.target.value;
        if(updatedItem.validation){
            updatedItem.valid = checkValidation(updatedItem.value,updatedItem.validation)
        }
        updatedItem.touched = true;
        updatedForm[formItem] = updatedItem;
        let formIsValid = true;
        for(let formItem in updatedForm){
            formIsValid = updatedForm[formItem].valid && formIsValid;
        }

        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }
    render(){
        let form = <form onSubmit={this.orderHandler}> 
            {Object.keys(this.state.orderForm).map(formItem=>(
                <Input
                    key={formItem} 
                    elementType={this.state.orderForm[formItem].elementType} 
                    label={formItem} 
                    elementConfig={this.state.orderForm[formItem].elementConfig}
                    value={this.state.orderForm[formItem].value}
                    changed={(event)=>this.inputChangedHandler(event,formItem)}
                    valid={this.state.orderForm[formItem].valid}
                    shouldValidate={this.state.orderForm[formItem].validation}
                    touched={this.state.orderForm[formItem].touched}

                />
            ))}
            <Button type='Success' disabled={!this.state.formIsValid}>Submit</Button>
        </form>;
        if(this.props.loading){
            form = <Spinner/>;
        }
        return(
            <div className={cssClasses.ContactData}>
                <h4>Feed me your data now</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPlaceOrder: (order,token) => dispatch(actionCreators.tryPurchaseBurger(order,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));