import { createStore, combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartMiniReducer from './cartMiniReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    Products: productsReducer,
    CartMini: cartMiniReducer,
    Cart: cartReducer,
    Wishlist: wishlistReducer,
    Comments: commentsReducer,
})

export default rootReducer;