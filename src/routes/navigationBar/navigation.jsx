import { Outlet } from "react-router-dom"
import { Fragment } from "react"

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

import { selectIsCartOpen } from "../../store/cart/cart.selector"

import { signOutUser } from "../../utils/firebase/firebase"

import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
  } from './navigationStyles.jsx';
import { selectCurrentUser } from "../../store/user/user.select"  
import { useSelector } from "react-redux"

const Navigation = () =>{

    const currentUser = useSelector(selectCurrentUser)

    const isCartOpen = useSelector(selectIsCartOpen)

    
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ):(
                            <NavLink to='/auth'>SIGN IN</NavLink>
                        )
                    }
                    <CartIcon />
                   
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}
export default Navigation