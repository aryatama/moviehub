import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Thumbnail } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../Redux/Actions';


const ReviewsComponent = (props) => {
    return (
        <View style={{ flexDirection: "row", padding: 10, marginTop: 10, backgroundColor: "#1b1b1b", elevation: 3, width: "100%" }}>

            <View style={{ borderRadius: 5, height: 130, marginTop: 6, backgroundColor: "#808080" }}>
                <Thumbnail source={{ uri: props.userPhoto }} square large />

                <View style={{ padding: 2, alignItems: "center" }}>
                    {/* <Text style={{ fontWeight: "bold", fontSize: 13, color: "white", width:70,}}></Text> */}
                    <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", }}>{props.userName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Icon name="star" color="#ffa500" size={20} />
                        <Text style={{ fontSize: 20, color: "white", marginLeft: 2 }}>{props.rating}</Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 8, width: 300 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffa500", paddingBottom: 5, borderBottomWidth: 2, borderColor: "#393e46" }}>{props.title}</Text>
                <Text style={{ fontSize: 15, color: "white", paddingTop: 5 }}>{props.desc} </Text>
            </View>

        </View>
    )
}

export default function Reviews({ route, navigation }) {

    const { movieId } = route.params;


    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)
    const dataReviews = useSelector(state => state.reviews.reviews)

    const dispatch = useDispatch()

    const handleGetReviews = (Token) => {
        dispatch(getReviews(Token))
    }

    const reviews = (dataReviews.rows || []).filter(review => {
        return review.MovieId == movieId
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
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ ...styles.LoginButton, borderRadius: 50, width: "50%", padding: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#ffa500" }}>
                    <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }} >LOGIN</Text>
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
                    <ReviewsComponent
                        userPhoto={item.Movie.poster}
                        userName={item.User.name}
                        title={item.title}
                        desc={item.description}
                        rating={item.rating}
                    />
                )}
                keyExtractor={item => `item ${item.id}`}
                contentContainerStyle={{

                }}
            />
            <ScrollView style={{ width: "100%" }}>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#212121'
    },
    LoginButton: {
        marginTop: 10,
        width: "60%",
        borderRadius: 50,
        elevation: 3
    },
})
