const initState = {
    movies: {},
    moviesByGenre: {},
    movieDetails: {},
    searchMovies: {}
}

export const moviesReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_MOVIE":
            return {
                ...state,
                movies: action.payload
            }

        case "GET_MOVIE_BY_GENRE":
            return {
                ...state,
                moviesByGenre: action.payload
            }

        case "GET_MOVIE_BY_SEARCH":
            return {
                ...state,
                searchMovies: action.payload
            }

        case "GET_MOVIE_DETAILS":
            return {
                ...state,
                movieDetails: action.payload
            }
        case "RESET_MOVIE":
            return {
                ...state,
                movies: {},
                moviesByGenre: {},
                movieDetails: {}
            }


        default:
            return state
    }
}