const initState = {
    profile: {},
    user: {},
}

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
        case "GET_USER":
            return {
                ...state,
                user: action.payload
            }
        case "RESET_USER":
            return {
                ...state,
                profile: {},
                user: {},
            }

        default:
            return state
    }
}