const initState = {
    cartItem: [],
    total: 0,
}

export const setCart = (cart) => {
    return {
        type: 'SET_CART',
        payload: cart
    }
}

export const deleteCart = (index) => {

    const local = JSON.parse(localStorage.getItem('mini_cart'));
    let temp2 = local.splice(index, 1);
    console.log(index);     
    localStorage.setItem('mini_cart', JSON.stringify(local));


    return {
        type: 'DELETE_CART',
        payload: index,
    }
}

const cartReducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_CART':
            return {
                ...state,
                carts: action.payload.cartItem
            }
        case 'DELETE_CART':
            let temp = state.cartItem.splice(action.payload, 1);
            let subTotal = Number(state.total) - Number(action.payload.price);
            return {
                ...state,
                cartItem: state.cartItem,
                sumCount: state.cartItem.length,
                total: subTotal
            }
        default:
            return state
    }
}

export default cartReducer;