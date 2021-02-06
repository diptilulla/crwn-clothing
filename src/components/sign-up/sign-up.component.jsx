import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault(); //prevent default form submit action

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword ) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password) //destructure user from returned obj from createuseremailandpassword which creates new user acc userAuth object is on property user so destructured

            await createUserProfileDocument(user, {displayName} ); //display name goes as object where displayName if property and actual name inside it goes as value

            this.setState({  //to clear the form reset to original
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }


    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                      type= 'text'
                      name= 'displayName'
                      value={displayName}
                      handleChange={this.handleChange}
                      label='Display Name'
                      required
                    />
                    <FormInput
                      type= 'email'
                      name= 'email'
                      value={email}
                      handleChange={this.handleChange}
                      label='Email'
                      required
                    />
                    <FormInput
                      type= 'password'
                      name= 'password'
                      value={password}
                      handleChange={this.handleChange}
                      label='Pasword'
                      required
                    />
                    <FormInput
                      type= 'password'
                      name= 'confirmPassword'
                      value={confirmPassword}
                      handleChange={this.handleChange}
                      label='Confirm Password'
                      required
                    />
                    <CustomButton type='submit'> SIGN UP </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;