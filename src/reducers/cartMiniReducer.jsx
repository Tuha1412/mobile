const initState = {
    cartItem: [],
    sumCount: 0,
    total: 0,
}


export const setCartMini = (cart) => {
    return {
        type: 'SET_CART_MINI',
        payload: cart
    }
}

export const addCartMini = (item) => {
    return {
        type: 'ADD_CART_MINI',
        payload: item,
    }
}

export const deleteCartMini = (index) => {
    return {
        type: 'DELETE_CART_MINI',
        payload: index,

    }
}


export const addToWishlist = (item) => {
    return {
        type: 'ADD_TO_WISHLIST',
        payload: item,
    }
}



const cartMiniReducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_CART_MINI':
            return {
                ...state,
                carts: action.payload.cartItem
            }

        case 'ADD_CART_MINI':
            var oldItems = [];
            let removeItem;
            if (JSON.parse(localStorage.getItem('mini_cart'))) {
                oldItems = JSON.parse(localStorage.getItem('mini_cart'));
            }

            if (oldItems) {
                oldItems.forEach((item, index) => {
                    if (action.payload.idProduct === item.idProduct) {
                        action.payload.quantity = Number(item.quantity) + Number(action.payload.quantity);
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
                sumCount: state.cartItem.length + 1,
                total: state.total + action.payload.price,
            }

        case 'DELETE_CART_MINI':
            // let temp = state.cartItem.splice(action.payload, 1);
            // let subTotal = Number(state.total) - Number(action.payload.price);


            const local = JSON.parse(localStorage.getItem('mini_cart'));
            let temp2 = local.splice(action.payload, 1);

            localStorage.setItem('mini_cart', JSON.stringify(local));
            return {
                ...state,
                cartItem: state.cartItem,
                sumCount: state.cartItem.length,
            }

        case 'ADD_TO_WISHLIST':
            var oldItems = [];
            if (JSON.parse(localStorage.getItem('wishlist'))) {
                oldItems = JSON.parse(localStorage.getItem('wishlist'));
            }

            if (oldItems) {
                oldItems.forEach((item) => {
                    if (action.payload.id === item.id) {
                        
                    }
                })
            }
            oldItems.push(action.payload); 
            localStorage.setItem('wishlist', JSON.stringify(oldItems));
            return {
                ...state,
                sumCount: action.payload.quantity,
            }
        
        default:    
            return state;
    }
}

export default cartMiniReducer;