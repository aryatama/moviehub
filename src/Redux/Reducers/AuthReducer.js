const initState = {
    isFlash: true,
    token: null,
    userId: null
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.token,
                userId: action.id
            }
        case "REGISTER":
            return {
                ...state,
                token: action.token,
                userId: action.id
            }
        case "CHECK_TOKEN":
            return {
                ...state,
                token: action.token,
                userId: action.id,
                isFlash: false
            }
        case "RESET_AUTH":
            return {
                ...state,
                token:null,
                userId: null,
            }

        default:
            return state;
    }
}