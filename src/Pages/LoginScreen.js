import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import Logo from '../Components/Logo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Logins } from '../Redux/Actions/AuthAction';

const Login = ({ navigation }) => {

    const dispatch = useDispatch()
    const dispatchLogin = (Email, Password) => dispatch(Logins(Email, Password))
    const token = useSelector(state => state.auth.token)

    token == null ? console.log(null) : navigation.navigate("Main")

    const handleLogin = (Email, Password) => {
        if (isValidPassword &&
            isValidEmail &&
            email != "" &&
            password != ""
        ) {
            dispatch({ type: "LOADING" })
            dispatchLogin(Email, Password)
            handleResetState()
        } else {
            dispatch({ type: "MESSAGE", message: "Invalid input" })
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPassword, setValidPassword] = useState(true)
    const [isValidEmail, setValidEmail] = useState(false)
    const [isShowPass, setIsShowPass] = useState(false)

    const handleValidUser = (val) => {
        if (val.trim().length >= 5) {
            setValidEmail(true)
            setEmail(val)
        } else {
            setEmail(val)
            setValidEmail(false)
        }
    }

    const handleValidPassword = (val) => {
        if (val.trim().length >= 5) {
            setPassword(val)
            setValidPassword(true)
        } else {
            setPassword(val)
            setValidPassword(false)
        }
    }

    const handleResetState = () => {
        setEmail('')
        setPassword('')
        setValidEmail(true)
        setValidPassword(true)
    }
    return (
        <>
            <View style={styles.container} >
                <View style={styles.linearGradient}>

                    <Logo />


                    <View style={{ ...styles.textInput, marginTop: 170, marginBottom: 20 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="email" size={30} color="rgba(0,0,0, 0.8)" />
                            <TextInput autoCapitalize="none" placeholder="Email" value={email} onChangeText={(e) => handleValidUser(e)} />
                        </View>
                        <Icon name={(isValidEmail && email != "") ? "check-circle" : "check-circle-outline"} size={25} color={(isValidEmail && email != "") ? "#ffa500" : "rgba(0,0,0,0.3)"} style={{ marginRight: 10 }} />

                    </View>


                    <View style={styles.textInput}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="lock" size={30} color="rgba(0,0,0, 0.8)" />
                            <TextInput secureTextEntry={!isShowPass} value={password} placeholder="Password" onChangeText={(e) => handleValidPassword(e)} />
                        </View>
                        <TouchableWithoutFeedback onPress={() => setIsShowPass(!isShowPass)}>
                            <Icon name={isShowPass ? "eye" : "eye-off"} size={25} color={isShowPass ? "#ffa500" : "rgba(0,0,0,0.8)"} style={{ marginRight: 10 }} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ height: 20 }}>
                        {isValidPassword ? null :
                            <Text style={{ color: "red", }}>Password should has minimal 5 characters</Text>
                        }
                    </View>

                    <TouchableOpacity onPress={() => handleLogin(email, password)} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >LOGIN</Text>
                    </TouchableOpacity>



                    <View style={{ margin: 30, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.Question}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => (navigation.navigate("Register"))}>
                            <Text style={{ ...styles.Question, fontWeight: "bold", margin: 5 }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View >
        </>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#292929"
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: "flex-start",
        alignItems: "center"
    },

    textInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        marginBottom: 0,
        width: "85%",
        borderRadius: 50,
        backgroundColor: "white",
        elevation: 3

    },
    LoginButton: {
        marginTop: 20,
        width: "60%",
        borderRadius: 50,
        elevation: 3
    },
    Question: {
        color: "white",

    }
})
