import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//custom button has children so can have closing tag

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {  //class component cz we have to store what users type
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault(); //prevents default submit action from firing

        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value }) // dynamically setting prop ,expression in brackets [], will be computed and used as the property name
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with you email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type="email" value={this.state.email} label="email" handleChange={this.handleChange} required />

                    <FormInput name="password" type="password" value={this.state.password} label="password" handleChange={this.handleChange} required />
                    <div className='buttons'>
                    <CustomButton type='submit' > Sign in </CustomButton>
                    <CustomButton onClick = {signInWithGoogle} isGoogleSignIn> {' '} Sign in with Google {' '} </CustomButton>
                     {/* isGoogleSignIn will be passed a true value if nothing is mpassed to it */}
                    </div>
                </form>
            </div>
        ); 
    }
}

export default SignIn;