import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //connect is a higher order comp that lets us modify our comp to have access things related to redux
import { createStructuredSelector } from "reselect";

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from '../../assets/crown.svg';  //special syntax for importng svg

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
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
                currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                  SIGN OUT
                </div>
                ) : (             //when null
                <Link className='option' to='/signin'>
                  SIGN IN
                </Link>
                )
            }
            <CartIcon />
        </div>
        {
            hidden ? null :
            <CartDropdown />
        }
    </div>
);

//function that allows us to access the state (root-reducer )
const mapStateToProps = createStructuredSelector({ //we are destructuring root reducer (state) as user and further destructuring user to currentUser i.e. nested destructure
    currentUser: selectCurrentUser, //from root-reducer to user value which will give us the user.reducer and from there we want currentuser
    hidden: selectCartHidden 
});//createStructuredSelector will automatically pass the root state that we get as mapStateToPops into selectors

export default connect(mapStateToProps)(Header); //getting access to state to be specific getting access to currentUser
//connect has to be passed 2 arguments oout of which 2nd is optional 1st is mapStateToProps which allows us to access state, here state=rooot reducer