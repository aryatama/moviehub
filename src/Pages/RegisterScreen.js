import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Logo from '../Components/Logo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { Registers } from '../Redux/Actions/AuthAction';

const Register = ({ navigation }) => {

    const dispatch = useDispatch();
    const dispatchRegister = (Name, Email, Password, Username) => dispatch(Registers(Name, Email, Password, Username))

    const handleRegister = (Name, Email, Password, Username) => {
        if (
            isValidName &&
            isValidPassword &&
            isValidUsername &&
            isValidUsername &&
            name != "" &&
            email != "" &&
            name != "" &&
            username != ""
        ) {
            dispatchRegister(Name, Email, Password, Username)
            dispatch({ type: "LOADING" })
        } else {
            dispatch({ type: "MESSAGE", message: "Invalid input" })
        }
    }

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPassword, setValidPassword] = useState(true)
    const [isValidEmail, setValidEmail] = useState(true)
    const [isValidName, setValidName] = useState(true)
    const [isValidUsername, setValidUsername] = useState(true)

    const [isShowPass, setIsShowPass] = useState(false)


    const handleValidEmail = (val) => {
        if (val.trim().length >= 6) {
            setValidEmail(true)
            setEmail(val)
        } else {
            setEmail(val)
            setValidEmail(false)
        }
    }

    const handleValidUsername = (val) => {
        if (val.trim().length >= 6) {
            setValidUsername(true)
            setUsername(val)
        } else {
            setUsername(val)
            setValidUsername(false)
        }
    }

    const handleValidName = (val) => {
        if (val.trim().length >= 3) {
            setValidName(true)
            setName(val)
        } else {
            setName(val)
            setValidName(false)
        }
    }

    const handleValidPassword = (val) => {
        if (val.trim().length >= 6) {
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
        <View style={styles.container} >
            <View style={styles.linearGradient}>

                <Logo />




                <View style={{ ...styles.textInput, marginTop: 100, marginBottom: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="account-badge" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput value={name} placeholder="Name" onChangeText={(e) => handleValidName(e)} />
                    </View>
                    <Icon name={(isValidName&& name !="") ? "check-circle" : "check-circle-outline"} size={25} color={(isValidName&& name !="") ? "#ffa500" : "rgba(0,0,0,0.3)"} style={{ marginRight: 10 }} />
                </View>


                <View style={styles.textInput}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="account-circle" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput value={username} placeholder="Username" onChangeText={(e) => handleValidUsername(e)} />
                    </View>
                    <TouchableWithoutFeedback onPress={() => dispatch({type:"MESSAGE", message:"The Username must be a unique name"})}>
                        <Icon name="information" size={25} color="#ffa500" style={{ marginRight: 10 }} />
                    </TouchableWithoutFeedback>
                </View>


                <View style={styles.textInput}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="email" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput placeholder="Email" value={email} onChangeText={(e) => handleValidEmail(e)} />
                    </View>
                    <Icon name={(isValidEmail&& email !="") ? "check-circle" : "check-circle-outline"} size={25} color={(isValidEmail&& email !="") ? "#ffa500" : "rgba(0,0,0,0.3)"} style={{ marginRight: 10 }} />
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
                        <Text style={{ color: "red", }}>Password should has minimal 6 characters</Text>
                    }
                </View>


                <TouchableOpacity onPress={() => handleRegister(name, email, password, username)} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >REGISTER</Text>
                </TouchableOpacity>

                <View style={{ margin: 30, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.Question}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => (navigation.navigate("Login"))}>
                        <Text style={{ ...styles.Question, fontWeight: "bold", margin: 5 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View >
    )
}

export default Register

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
    LoginForm: {
        justifyContent: "center",
        alignItems: "center",
        width: '85%',
        height: '40%',
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5
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
        elevation: 3,
        marginBottom: 20

    },
    LoginButton: {
        marginTop: 20,
        width: "60%",
        borderRadius: 50,
        elevation: 3
    },
    linierButton: {
        borderRadius: 50, width: "100%", padding: 15, justifyContent: "center",
        alignItems: "center",

    },
    Question: {
        color: "white",

    }
})
