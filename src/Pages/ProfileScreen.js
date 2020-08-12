import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native'
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProfile, updateUser, uploadPhotoProfile } from '../Redux/Actions/ProfileAction';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';


const Profile = ({navigation}) => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const token = useSelector(state => state.auth.token)
    const profile = useSelector(state => state.profile.profile)
    const user = useSelector(state => state.profile.user)

    const dispatch = useDispatch()

    const handleGetProfile = (token, Email, Name, Username) => {
        dispatch(updateUser(token, Email, Name, Username))
        dispatch({ type: 'LOADING' })
        setEdit(!edit)
    }

    const handleUploadPhoto = (token, photo, photoName, photoType) => {
        dispatch(uploadPhotoProfile(token, photo, photoName, photoType))
        dispatch({ type: 'LOADING' })
        resetState()
    }

    const handleLogout = () => {
        AsyncStorage.removeItem('@token')
        AsyncStorage.removeItem('@id')
        dispatch({ type: 'RESET_AUTH' })
        dispatch({ type: 'RESET_REVIEW' })
        dispatch({ type: 'RESET_USER' })
    }
    const resetState = () => {
        setPhotoProfile(null)
        setPhotoName(null)
        setPhotoType(null)
    }



    const [edit, setEdit] = useState(false)
    const [photoProfile, setPhotoProfile] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const [photoType, setPhotoType] = useState(null);


    const handleChoosePhoto = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error = ', response.error);
            } else {
                console.log(response)
                setPhotoProfile(response.uri);
                setPhotoName(response.fileName);
                setPhotoType(response.type);
            }
        });
    };

    if (token == null) {
        return (
            <View style={{...styles.container,  justifyContent: "center"}}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >LOGIN AS USER</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ThumbnailStyle} onPress={() => handleChoosePhoto()} >
                <Thumbnail source={{ uri: profile.image_url }} style={{ width: 180, height: 180, borderRadius: 100 }} />
            </TouchableOpacity>

            {photoName !== null ?
                <TouchableOpacity style={{ padding: 7, backgroundColor: "#ffa500", borderRadius: 50, width: "40%", alignItems: "center", marginBottom: 25 }} onPress={() => handleUploadPhoto(token, photoProfile, photoName, photoType)}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 14 }}>UPLOAD : {photoName}</Text>
                </TouchableOpacity>
                : null}


            {edit ? <><View style={styles.textInput}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                    <TextInput value="Name" placeholder="Name" value={name} onChangeText={(e) => setName(e)} />
                </View>
            </View>
                <View style={styles.textInput}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput value="Username" placeholder="Username" value={username} onChangeText={(e) => setUsername(e)} />
                    </View>
                </View>
                <View style={styles.textInput}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput value="Email" placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => handleGetProfile(token, email, name, username)} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEdit(!edit)} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >CANCEL</Text>
                </TouchableOpacity></>


                :

                <><View style={styles.textInput}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                        <TextInput value="Name" editable={false} placeholder="Name" value={user.name} style={{ color: "black", fontWeight: "bold" }} onChangeText={(e) => setName(e)} />
                    </View>
                </View>
                    <View style={styles.textInput}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                            <TextInput value="Username" editable={false} placeholder="Username" value={user.username} style={{ color: "black", fontWeight: "bold" }} onChangeText={(e) => setUsername(e)} />
                        </View>
                    </View>
                    <View style={styles.textInput}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="account" size={30} color="rgba(0,0,0, 0.8)" />
                            <TextInput value="Email" editable={false} placeholder="Email" value={user.email} style={{ color: "black", fontWeight: "bold" }} onChangeText={(e) => setEmail(e)} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setEdit(!edit)} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >EDIT</Text>
                    </TouchableOpacity></>}

            <TouchableOpacity onPress={() => handleLogout()} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >LOGOUT</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#212121'
    },
    ThumbnailStyle: {
        width: "100%",
        paddingTop: 20,
        alignItems: "center",
        marginBottom: 5
    },
    textInput: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        width: "90%",
        borderRadius: 50,
        backgroundColor: "white",
        marginBottom: 30
    },
    LoginButton: {
        marginTop: 10,
        width: "60%",
        borderRadius: 50,
        elevation: 3
    },
})
