import { connect } from 'react-redux';
import Cart from '../components/Cart/Cart';
import { setCart, deleteCart } from '../reducers/cartReducer';

const mapStateToProps = (state) => {
    return {
        cart: state.Cart.cartItem,
        total: state.Cart.total
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCart: (products) => dispatch(setCart(products)),
    deleteCart: (item) => dispatch(deleteCart(item))
})


export default connect(mapStateToProps, mapDispatchToProps)(Cart);