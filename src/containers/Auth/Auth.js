import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../hoc/shared/utility'
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                value: '',
                valid: false,
                touched: false

            }
        },
        isSignup: true
    }


    componentDidMount() {

        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }

    }



    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {

        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />

        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log("We are auth, redirecting to ", this.props.authRedirectPath);
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit </Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);