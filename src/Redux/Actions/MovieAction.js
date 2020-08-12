import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "http://mini-project-movie.herokuapp.com"

export const getMovies = () => {
    return async dispatch => {
        try {
            const resMovie = await Axios.get(`${BASE_URL}/api/v1/movies`)
            const DATA = resMovie.data.data[0]

            if (resMovie.status == 200) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "GET_MOVIE", payload: DATA })
            }
            const resMovieDetails = await Axios.get(`${BASE_URL}/api/v1/movies/1`)
            const DATAMovie = resMovieDetails.data.data[0]

            if (resMovieDetails.status == 200) {
                dispatch({ type: "GET_MOVIE_DETAILS", payload: DATAMovie })
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export const getMoviesGenre = (genre) => {
    return async dispatch => {
        try {
            console.log(`${BASE_URL}/api/v1/movies?movie=${genre}`)

            const resMovie = await Axios.get(`${BASE_URL}/api/v1/movies?movie=${genre}`)
            const DATA = resMovie.data.data[0]

            if (resMovie.status == 200) {
                console.log("the datatatatt", DATA)
                dispatch({ type: "GET_MOVIE_BY_GENRE", payload: DATA })
                dispatch({ type: "LOADING" })

            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getMoviesSearch = (search) => {
    return async dispatch => {
        try {

            const resMovie = await Axios.get(`${BASE_URL}/api/v1/movies?movie=${search}`)
            const DATA = resMovie.data.data[0]

            if (resMovie.status == 200) {
                dispatch({ type: "GET_MOVIE_BY_SEARCH", payload: DATA })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getMoviesDetails = (movieId) => {
    return async dispatch => {
        try {
            const resMovie = await Axios.get(`${BASE_URL}/api/v1/movies/${movieId}`)
            const DATA = resMovie.data.data[0]

            if (resMovie.status == 200) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "GET_MOVIE_DETAILS", payload: DATA })
            }


        } catch (error) {
            console.log(error)
        }
    }
}
