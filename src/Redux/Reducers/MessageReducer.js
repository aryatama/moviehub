const initState = {
    isLoading: false,
    message: "",
    isVisible: false,
}

export const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING":
            let loading = state.isLoading
            return {
                ...state,
                isLoading: !loading
            }
        case "MESSAGE":
            let visible = state.isVisible
            return {
                ...state,
                isVisible: !visible,
                message: action.message
            }
        case "CLOSE_MESSAGE":
            return {
                ...state,
                isVisible: false,
            }

        default:
            return state;
    }
}