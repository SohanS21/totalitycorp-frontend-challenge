import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import { CartIconContainer, ItemCount } from './cart-icon.styles';


const CartIcon = () => {
    
    const dispatch = useDispatch();
    const cartItemCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen);

    const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    return(
    <CartIconContainer onClick={toogleIsCartOpen}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
    )
}

export default CartIcon