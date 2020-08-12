import React, { useState } from 'react'
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { postReviews } from '../Redux/Actions';


const AddModal = (props) => {

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const handlePostReviews = (Token, Id, Title, Desc, Rating) => {
        if (Title != '' && Desc != '' && Rating != 0) {
            dispatch(postReviews(Token, Id, Title, Desc, Rating))
            dispatch({ type: "LOADING" })
        } else dispatch({ type: "MESSAGE", message: "Invalid review" })
    }

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState(0)



    const resetHandle = () => {
        setTitle('')
        setDesc('')
        setRating(0)
    }
    return (
        <KeyboardAvoidingView style={{flex: 1, justifyContent: "center", alignItems:"center"}} enabled={true} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.theShowModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{ flexDirection: "column", width: "90%", paddingHorizontal: 10, paddingBottom: 10, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>

                            <View style={{ marginBottom: 10, padding: 10, borderColor: "#808080", borderBottomWidth: 2 }}>
                                <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold", color: "#ffa500", alignSelf: "center", }}>How do you think about this movie?</Text>
                            </View>


                            <View style={{ marginBottom: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableWithoutFeedback onPress={() => setRating(1)}>
                                        <Icon name={rating >= 1 ? "star" : "star-outline"} size={30} color={rating >= 1 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(2)}>
                                        <Icon name={rating >= 2 ? "star" : "star-outline"} size={30} color={rating >= 2 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(3)}>
                                        <Icon name={rating >= 3 ? "star" : "star-outline"} size={30} color={rating >= 3 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(4)}>
                                        <Icon name={rating >= 4 ? "star" : "star-outline"} size={30} color={rating >= 4 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(5)}>
                                        <Icon name={rating >= 5 ? "star" : "star-outline"} size={30} color={rating >= 5 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(6)}>
                                        <Icon name={rating >= 6 ? "star" : "star-outline"} size={30} color={rating >= 6 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(7)}>
                                        <Icon name={rating >= 7 ? "star" : "star-outline"} size={30} color={rating >= 7 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(8)}>
                                        <Icon name={rating >= 8 ? "star" : "star-outline"} size={30} color={rating >= 8 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(9)}>
                                        <Icon name={rating >= 9 ? "star" : "star-outline"} size={30} color={rating >= 9 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => setRating(10)}>
                                        <Icon name={rating >= 10 ? "star" : "star-outline"} size={30} color={rating >= 10 ? "#ffa500" : "rgba(255,255,255,0.5)"} />
                                    </TouchableWithoutFeedback>

                                </View>
                            </View>


                            <View style={{ ...styles.textInput }}>
                                <TextInput placeholder="Title"  multiline editable value={title}  onChangeText={(e) => setTitle(e)} />
                            </View>

                            <View style={{ ...styles.textInput }}>
                                <TextInput placeholder="Synopsis" multiline editable numberOfLines={2} textAlignVertical="top" value={desc} onChangeText={(e) => setDesc(e)} />
                            </View>
                            {/* <View style={{ ...styles.textInput }}>
                            <TextInput placeholder="Director" />
                        </View>
                        <View style={{ ...styles.textInput }}>
                            <TextInput placeholder="Actor" />
                        </View>
                        <View style={{ ...styles.textInput }}>
                            <TextInput placeholder="Languages" />
                        </View>

                        <View style={{ ...styles.textInput, justifyContent: "space-between" }}>
                            <TextInput placeholder="Genre" />
                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowGenre(!showGenre)}>
                                <Icon name="plus-box" size={30} color="#ffa500" />
                            </TouchableOpacity>

                        </View>
                        {showGenre ?
                            <View style={{ width: 100, height: 100, backgroundColor: "white", borderRadius: 10, marginBottom: 10, alignSelf: "center" }}>

                                <FlatList
                                    data={data}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ borderColor: "#808080", alignItems: "center", paddingVertical: 3 }} onPress={() => setShowGenre(false)}>
                                            <Text>{item} </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => `item ${item}`}
                                    style={{ width: "100%", paddingHorizontal: 5, }}
                                />
                            </View>
                            : null}
                            
                        <View style={{ ...styles.textInput }}>
                            <TextInput placeholder="Trailer" />
                        </View>
                        <View style={{ ...styles.textInput, justifyContent: "space-between" }}>
                            <TextInput placeholder="Poster" />
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <Icon name="plus-box" size={30} color="#ffa500" />
                            </TouchableOpacity>
                        </View> */}

                        </View>

                        <View style={{ flexDirection: "row" }} >
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#ffa500", marginRight: 10 }}
                                onPress={() => {
                                    handlePostReviews(token, props.movieID, title, desc, rating)
                                    props.handleAddModal()
                                    resetHandle()
                                }}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#d63447" }}
                                onPress={() => {
                                    resetHandle()
                                    props.handleAddModal()
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>



                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

export default AddModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)"
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "#292929",
        borderRadius: 20,
        paddingBottom: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    Note: {
        width: "100%",
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10
    },
    openButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 30,
        borderRadius: 10,
        elevation: 3
    },
    textInput: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        marginBottom: 10,
        width: "100%",
        borderRadius: 50,
        backgroundColor: "white",
        elevation: 3

    },
})
