import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import ListProduct from '../components/ListProduct/ListProduct';
import Cart from '../components/Cart/Cart';
import { setCartMini, deleteCartMini } from '../reducers/cartMiniReducer';

const mapStateToProps = (state) => {
    
    return {
        cart: state.CartMini.cartItem,
        sumCount: state.CartMini.sumCount,
        total: state.CartMini.total
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCartMini: (products) => dispatch(setCartMini(products)),
    deleteCartMini: (item) => dispatch(deleteCartMini(item))
})


export default connect(mapStateToProps, mapDispatchToProps)(Header, ListProduct, Cart);