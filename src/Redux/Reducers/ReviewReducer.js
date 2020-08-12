const initState = {
    reviews : {}
}

export const reviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_REVIEW":
            return {
                ...state,
                reviews: action.payload
            }

        case "RESET_REVIEW":
            return {
                ...state,
                reviews : {}
            }

      

        default:
            return state
    }
}