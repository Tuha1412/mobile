const initState = {
    cartItem: []
}


export const removeToWishlist = (index) => {
    return {
        type: 'REMOVE_TO_WISHLIST',
        payload: index,
    }
}


export const addCartWishlist = (item) => {
    return {
        type: 'ADD_CART_WISHLIST',
        payload: item
    }
}

const wishlistReducer = (state = initState, action) => {

    switch (action.type) {

        case 'REMOVE_TO_WISHLIST':
            const local = JSON.parse(localStorage.getItem('wishlist'));
            let temp2 = local.splice(action.payload, 1);

            localStorage.setItem('wishlist', JSON.stringify(local));
            return {
                ...state,
            }

        case 'ADD_CART_WISHLIST':
            var oldItems = [];
            let removeItem;
            if (JSON.parse(localStorage.getItem('mini_cart'))) {
                oldItems = JSON.parse(localStorage.getItem('mini_cart'));
            }

            if (oldItems) {
                oldItems.forEach((item, index) => {
                    if (action.payload.id === item.id) {
                        action.payload.quantity++;
                        oldItems[index] = action.payload;
                        removeItem = oldItems.splice(index, 1);
                    }
                })
            }
            oldItems.push(action.payload);
            localStorage.setItem('mini_cart', JSON.stringify(oldItems));

            return {
                ...state,
                cartItem: [...state.cartItem, action.payload],
            }

        default:
            return state;
    }
}

export default wishlistReducer;