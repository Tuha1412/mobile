const initState = {
    comments: [],

}

export const setComments = (comments) => {
    return {
        type: 'SET_COMMENTS',
        payload: comments,
    }
}




const commentsReducer = (state = initState, action) => {

    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }

        
        default:
            return state
    }
}

export default commentsReducer;