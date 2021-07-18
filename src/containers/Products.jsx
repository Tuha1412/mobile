import { connect } from 'react-redux';
import ListProduct from '../components/ListProduct/ListProduct';
import { setProducts } from '../reducers/productsReducer';
import { setCartMini, addCartMini, addToWishlist } from '../reducers/cartMiniReducer';
import { setCart } from '../reducers/cartReducer';

const mapStateToProps = (state) => {
    return {
        products: state.Products.products,
        cart: state.Cart.cartItem
    }
}

let mapDispatchToProps = (dispatch) => ({
    setProducts: (products) => dispatch(setProducts(products)),
    setCartMini: (products) => dispatch(setCartMini(products)),
    addCartMini: (item) => dispatch(addCartMini(item)),
    setCart: (products) => dispatch(setCart(products)),
    addToWishlist: (item) => dispatch(addToWishlist(item))
    
})


export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);