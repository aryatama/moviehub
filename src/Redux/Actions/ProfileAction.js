import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios"

const BASE_URL = "http://mini-project-movie.herokuapp.com"


export const getProfile = (token) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/v1/profiles`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA_PROFILE = res.data.data
            if (res.status == 200) {
                dispatch({ type: 'GET_PROFILE', payload: DATA_PROFILE })
            }

            const resUser = await Axios.get(`${BASE_URL}/api/v1/users`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA_USER = resUser.data.data
            if (resUser.status == 200) {
                dispatch({ type: 'GET_USER', payload: DATA_USER })
            }
        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "MESSAGE", message: "Email and password is invalid" })
            console.log(error)
        }
    }
}


export const updateUser = (token, Email, Name, Username) => {
    return async dispatch => {
        try {
            const res = await Axios.put(`${BASE_URL}/api/v1/users`, {
                email: Email,
                name: Name,
                username: Username
            }, {
                headers: {
                    Authorization: token
                }
            })
            if (res.status == 200) {
                dispatch({ type: 'MESSAGE', message: "Data user has been updated" })
            }
            const resUser = await Axios.get(`${BASE_URL}/api/v1/users`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA_USER = resUser.data.data
            if (res.status == 200) {
                dispatch({ type: 'GET_USER', payload: DATA_USER })
                dispatch({ type: 'LOADING' })

            }
        } catch (error) {
            dispatch({ type: 'LOADING' })
            dispatch({ type: "MESSAGE", message: "Email and password is invalid" })
            console.log(error)
        }
    }
}


export const uploadPhotoProfile = (token, photo, photoName, photoType ) => {
    const dataForm = new FormData();
    dataForm.append('image', {
        uri: photo,
        name: photoName,
        type: photoType
    });
    return async dispatch => {
        try {
            const ress = await Axios.post(`${BASE_URL}/api/v1/profiles/uploadPhoto`, dataForm, {
                headers: {
                    Authorization: token
                },
            })
            console.log(ress, "resresresresre")

            if (ress.status == 200) {
                dispatch({ type: 'MESSAGE' , message:"Photo Profile has been updated" })
            }
            const res = await Axios.get(`${BASE_URL}/api/v1/profiles`, {
                headers: {
                    Authorization: token
                }
            })
            const DATA_PROFILE = res.data.data
            if (res.status == 200) {
                dispatch({ type: 'GET_PROFILE', payload: DATA_PROFILE })
                dispatch({ type: 'LOADING' })
            }
            
        } catch (error) {
            console.log(error, "asdadadadasdadasdasdasd")
        }
    }
}