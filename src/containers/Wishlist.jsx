import { connect } from 'react-redux';
import Wishlist from '../components/Wishlist/Wishlist';
import { removeToWishlist, addCartWishlist } from '../reducers/wishlistReducer';


const mapStateToProps = (state) => {
    return {
        cart: state.Wishlist.cartItem
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeToWishlist: (index) => dispatch(removeToWishlist(index)),
    addCartWishlist: (item) => dispatch(addCartWishlist(item)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);