import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getReviews, deleteReview } from '../Redux/Actions';
import { useSelector, useDispatch } from 'react-redux';
import EditModal from '../Components/EditModal';


const CommentComponent = (props) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <View style={{ flexDirection: "row", padding: 10, marginTop: 10, backgroundColor: "#1b1b1b", elevation: 3, width: "100%" }}>

            <View style={{ backgroundColor: "#393e46", borderRadius: 5, height: 160, marginTop: 6 }}>
                <Image source={{ uri: props.moviePoster }} style={styles.imgSubContent} />
                <View style={{ padding: 5 }}>
                    {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", width:70,}}></Text> */}
                    <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", }}>{props.movieReleased}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Icon name="star" color="#ffa500" size={15} />
                        <Text style={{ fontSize: 12, color: "white", marginLeft: 2 }}>{props.movieRating}</Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 8, width: 300, }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffa500", paddingBottom: 5, borderBottomWidth: 2, borderColor: "#393e46" }}>{props.title}</Text>
                <Text style={{ fontSize: 15, color: "white", paddingTop: 5 }}>{props.desc}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "flex-start", marginTop: 10 }}>
                    <Icon name="star" color="#ffa500" size={20} />
                    <View style={{ flexDirection: "row", alignItems: "flex-end", }}>
                        <Text style={{ fontSize: 20, color: "white" }}>{props.rating}/</Text>
                        <Text style={{ color: "#808080" }}>10</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignSelf: "flex-end", marginTop: 10 }} >
                    <TouchableOpacity >
                        <Icon name="pencil-circle" color="#2fc4b2" size={30} onPress={() => setShowModal(!showModal)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => props.handleDelete()}>
                        <Icon name="trash-can" color="#d92027" size={30} />
                    </TouchableOpacity>
                </View>
            </View>

            <EditModal
                theShowModal={showModal}
                handleAddModal={() => setShowModal(!showModal)}
                reviewId={props.reviewId}
                theTitle={props.title}
                theDesc={props.desc}
                theRating={props.rating}
            />

        </View>
    )
}


const Comment = ({navigation}) => {
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)
    const dataReviews = useSelector(state => state.reviews.reviews)

    const dispatch = useDispatch()

    const handleGetReviews = (Token) => {
        dispatch(getReviews(Token))
    }

    const handleDelete = (Token, reviewId) => {
        dispatch(deleteReview(Token, reviewId))
        dispatch({ type: "LOADING" })
    }

    const reviews = (dataReviews.rows || []).filter(review => {
        return review.UserId == userId
    });

    useEffect(() => {
        if (token !== null) {
            dispatch({ type: "LOADING" })
            handleGetReviews(token)
        }
    }, [])


    if (token == null) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() =>navigation.navigate("Login")} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >LOGIN AS USER</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <CommentComponent
                        moviePoster={item.Movie.poster}
                        movieReleased={item.Movie.id}
                        movieRating={item.Movie.id}
                        title={item.title}
                        desc={item.description}
                        rating={item.rating}
                        reviewId={item.id}
                        handleDelete={() => handleDelete(token, item.id)}
                    />
                )}
                keyExtractor={item => `item ${item.id}`}
                contentContainerStyle={{

                }}
            />

        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#212121'
    },
    imgSubContent: {
        width: 80,
        height: 120,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    LoginButton: {
        marginTop: 10,
        width: "60%",
        borderRadius: 50,
        elevation: 3
    },
})
