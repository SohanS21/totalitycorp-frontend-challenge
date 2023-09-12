import './productCard.scss'
import { useSelector,useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button'

const ProductCard = ({product}) =>{

    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();
    const {name,price,imageUrl} = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems,product))
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt=''/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>

        </div>
    )
}
export default ProductCard;