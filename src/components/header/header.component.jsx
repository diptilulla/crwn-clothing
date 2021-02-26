import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //connect is a higher order comp that lets us modify our comp to have access things related to redux

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';  //special syntax for importng svg

import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                  SIGN OUT
                </div>
                :             //when null
                <Link className='option' to='/signin'>
                  SIGN IN
                </Link>
            }
        </div>
    </div>
);

//function that allows us to access the state (root-reducer )
const mapStateToProps = state => ({ //we want rootreducer as state and return an obj
    currentUser: state.user.currentUser //from root-reducer to user value which will give us the user.reducer and from there we want currentuser
    

})

export default connect(mapStateToProps)(Header); //getting access to state to be specific getting access to currentUser
//connect has to be passed 2 arguments oout of which 2nd is optional 1st is mapStateToProps which allows us to access state, here state=rooot reducer