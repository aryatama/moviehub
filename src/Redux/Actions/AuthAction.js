import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "http://mini-project-movie.herokuapp.com"

export const checkToken = () => {
    return async dispatch => {
        try {
            const resId = await AsyncStorage.getItem("@id")
            const res = await AsyncStorage.getItem("@token")
            dispatch({ type: 'CHECK_TOKEN', token: res, id: parseInt(resId) })

        } catch (error) {
            console.log(error)
        }
    }
}

export const Logins = (Email, Password) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`${BASE_URL}/api/v1/users/login`, {
                email: Email,
                password: Password
            })
            console.log(res)
            console.log(res.data.data.id)
            if (res.status == 200) {
                await AsyncStorage.setItem("@token", res.data.data.access_token)
                await AsyncStorage.setItem("@id", String(res.data.data.id))
                dispatch({ type: 'LOGIN', token: res.data.data.access_token, id: res.data.data.id })
                dispatch({ type: 'LOADING' })
                console.log("Login bErhasil")

                const resS = await Axios.get(`${BASE_URL}/api/v1/profiles`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA_PROFILE = resS.data.data
                if (resS.status == 200) {
                    dispatch({ type: 'GET_PROFILE', payload: DATA_PROFILE })
                    console.log("profile dapat")
                }

                const resUser = await Axios.get(`${BASE_URL}/api/v1/users`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA_USER = resUser.data.data
                if (resUser.status == 200) {
                    dispatch({ type: 'GET_USER', payload: DATA_USER })
                    console.log("user dapat")
                }

                const resReviews = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA = resReviews.data.data[0]
    
                if (resReviews.status == 200) {
                    dispatch({ type: "GET_REVIEW", payload: DATA })
                }
            }

        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "MESSAGE", message: "Email and password is invalid" })
            console.log(error)
        }
    }
}

export const Registers = (Name, Email, Password, Username) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`${BASE_URL}/api/v1/register`, {
                //  username : Username,
                email: Email,
                name: Name,
                username: Username,
                password: Password
            })
            if (res.status == 201) {
                await AsyncStorage.setItem("@token", res.data.data.access_token)
                await AsyncStorage.setItem("@id", String(res.data.data.id))
                dispatch({ type: 'REGISTER', token: res.data.data.access_token, id: res.data.data.id })
                dispatch({ type: 'LOADING' })

                const resS = await Axios.get(`${BASE_URL}/api/v1/profiles`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA_PROFILE = resS.data.data
                if (resS.status == 200) {
                    dispatch({ type: 'GET_PROFILE', payload: DATA_PROFILE })
                    console.log("profile dapat")
                }

                const resUser = await Axios.get(`${BASE_URL}/api/v1/users`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA_USER = resUser.data.data
                if (resUser.status == 200) {
                    dispatch({ type: 'GET_USER', payload: DATA_USER })
                    console.log("user dapat")
                }

                const resReviews = await Axios.get(`${BASE_URL}/api/v1/reviews/all`, {
                    headers: {
                        Authorization: res.data.data.access_token
                    }
                })
                const DATA = resReviews.data.data[0]
    
                if (resReviews.status == 200) {
                    dispatch({ type: "GET_REVIEW", payload: DATA })
                }


            }
        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "MESSAGE", message: "Email is invalid or already used" })
            console.log(error)

        }
    }
}