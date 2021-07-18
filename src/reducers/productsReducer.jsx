const initState = {
    products: [],
    product: {}
}

export const setProducts = (products) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products,
    }
}

export const setProduct = (products) => {
    return {
        type: 'SET_PRODUCT',
        payload: products,
    }
}



const productsReducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload
            }

        default:
            return state
    }
}

export default productsReducer;