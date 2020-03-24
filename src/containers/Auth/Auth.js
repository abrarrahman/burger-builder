import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../store/actions/index';
import cssClasses from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidation} from '../../shared/utility'

class Auth extends Component{
    state={
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: true
    }
    inputChangedHandler = (event,formItem) => {
        const updatedForm = {...this.state.authForm}
        const updatedItem = {...this.state.authForm[formItem]};
        updatedItem.touched = true;
        updatedItem.value = event.target.value;
        if(updatedItem.validation){
            updatedItem.valid = checkValidation(updatedItem.value,updatedItem.validation)
        }
        updatedForm[formItem] = updatedItem;
        let formIsValid = true;
        for(let formItem in updatedForm){
            formIsValid = updatedForm[formItem].valid && formIsValid;
        }

        this.setState({authForm: updatedForm, formIsValid});
    }
    authSubmitHandler = event => {
        event.preventDefault();
        let mode = '';
        this.state.isSignUp? mode = 'signUp': mode = 'signIn';
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value,mode);
    }
    onSwitchAuthMode = () => {
        this.setState({isSignUp: !this.state.isSignUp})
    }
    render(){
        let form = <form onSubmit={this.authSubmitHandler}> 
            {Object.keys(this.state.authForm).map(formItem=>(
                <Input
                    key={formItem} 
                    elementType={this.state.authForm[formItem].elementType} 
                    label={formItem} 
                    elementConfig={this.state.authForm[formItem].elementConfig}
                    value={this.state.authForm[formItem].value}
                    changed={(event)=>this.inputChangedHandler(event,formItem)}
                    valid={this.state.authForm[formItem].valid}
                    shouldValidate={this.state.authForm[formItem].validation}
                    touched={this.state.authForm[formItem].touched}

                />
            ))}
            <Button type='Success' disabled={!this.state.formIsValid}>Submit</Button>
        </form>;
        let errorMessage = this.props.error? <p className={cssClasses.Error}>{this.props.error.message}</p>: null;
        return (
            <div className={cssClasses.Auth}>
                <h2>{this.state.isSignUp? 'Sign Up': 'Sign In'}</h2>
                {errorMessage}
                {this.props.loading? <Spinner/>: form}
                <Button type='Danger' click={this.onSwitchAuthMode}>Switch to {this.state.isSignUp? 'Sign In': 'Sign Up'}</Button>
                {this.props.isAuthenticated? <Redirect to='/'/>: null}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token!==null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,mode) => dispatch(actionCreators.tryAuth(email,password,mode))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);