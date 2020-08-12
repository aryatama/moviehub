import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Message(props) {
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()
    const handleCloseMessage = () => dispatch({ type : "MESSAGE", message:""})
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={message.isVisible}
            >

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <View style={{width: "70%", backgroundColor:"#393e46", justifyContent: "center", alignItems: "center", padding:10, borderRadius: 10, elevation: 8 }}>
                    <Icon name="alert-circle" size={40} color="#ffa500"/>
                    <Text style={{fontWeight:"normal", fontSize:20, marginVertical: 20, color:"white", textAlign:"center"}} >{message.message}</Text>
                    <TouchableOpacity onPress={() => handleCloseMessage()} style={{borderRadius:5, backgroundColor:"#ffa500", padding:7,  justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: "black", fontWeight:"bold", fontSize:12}}>GOT IT</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})
