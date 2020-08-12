import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "http://mini-project-movie.herokuapp.com"

export const getReviews = (token) => {
    return async dispatch => {
        try {
            const resReviews = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA = resReviews.data.data[0]

            if (resReviews.status == 200) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "GET_REVIEW", payload: DATA })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const postReviews = (token, id, title, desc, rating) => {
    console.log("res reviews naya ini loh jalan gk", token, id, title, desc, rating)

    return async dispatch => {
        try {
            const resMovie = await Axios.post(`${BASE_URL}/api/v1/reviews/${id}`, {
                title: title,
                description: desc,
                rating: rating
            }, {
                headers: {
                    Authorization: token
                }
            })
            const resReviews = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                headers: {
                    Authorization: token
                }
            })
            if (resMovie.status == 201) {
                dispatch({ type: "MESSAGE", message: "Thanks For The Reviews" })

            }
            const DATA = resReviews.data.data[0]

            if (resReviews.status == 200) {
                dispatch({ type: "GET_REVIEW", payload: DATA })
            }
            const resMovies = await Axios.get(`${BASE_URL}/api/v1/movies/${id}`)
            const DATAs = resMovies.data.data[0]

            if (resMovies.status == 200) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "GET_MOVIE_DETAILS", payload: DATAs })
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: "LOADING" })
            dispatch({ type: "MESSAGE", message: "Failed : You can only review this movie once" })
        }
    }
}

export const deleteReview = (token, reviewId) => {
    return async dispatch => {
        try {
            const resReviews = await Axios.delete(`${BASE_URL}/api/v1/reviews/${reviewId}`, {
                headers: {
                    Authorization: token
                }
            })
            const resReview = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA = resReview.data.data[0]

            if (resReviews.status == 200) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "MESSAGE", message: "Your Review and Rating has deleted" })
            }
            if (resReview.status == 200) {
                dispatch({ type: "GET_REVIEW", payload: DATA })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const editReview = (token, reviewId, title, desc, rating) => {
    console.log("setp1")
    return async dispatch => {
        try {
            const resReviews = await Axios.put(`${BASE_URL}/api/v1/reviews/${reviewId}`, {
                title: title,
                description: desc,
                rating: rating
            }, {
                headers: {
                    Authorization: token
                }
            })
            console.log("setp2")

            const resReview = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA = resReview.data.data[0]

            if (resReviews.status == 202) {
                dispatch({ type: "LOADING" })
                dispatch({ type: "MESSAGE", message: "Your Review and Rating has edited" })
            }
            if (resReview.status == 200) {
                dispatch({ type: "GET_REVIEW", payload: DATA })
                console.log("setp3")

            }
        } catch (error) {
            console.log(error)
        }
    }
}

