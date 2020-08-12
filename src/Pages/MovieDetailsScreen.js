import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesDetails } from '../Redux/Actions';
import AddModal from '../Components/AddModal';
import moment from 'moment';


export default function MovieDetails({ route, navigation }) {

    const { movieId } = route.params;

    const movie = useSelector(state => state.movies.movieDetails.movie)
    const movieRating = useSelector(state => state.movies.movieDetails.averageRating)
    const token = useSelector(state => state.auth.token)


    const dispatch = useDispatch()
    const handleGetMoviesDetails = (id) => {
        dispatch(getMoviesDetails(id))
    }


    useEffect(() => {
        handleGetMoviesDetails(movieId)
        dispatch({ type: "LOADING" })
    }, [])




    const [showMovieInfo, setShowMovieInfo] = useState(false)
    const [showModal, setShowModal] = useState(false)
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{}}>

                    <View style={{ padding: 10, backgroundColor: "#1b1b1b", marginTop: 10, elevation: 2 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingRight: 10 }}>
                            <View style={{ flexDirection: "row", width: 200 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>{movie.title} </Text>
                                <Text style={{ fontSize: 25, color: "white", marginLeft: 5 }}>{movieId}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", height: 30 }}>
                                <Icon name="star" color="#ffa500" size={30} />
                                <View style={{ flexDirection: "row", alignItems: "flex-end", }}>
                                    <Text style={{ fontSize: 25, color: "white" }}>{movieRating}/</Text>
                                    <Text style={{ color: "#808080", paddingBottom: 2 }}>10</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Image source={{ uri: movie.poster }} style={styles.imgSubContent} />
                            <View style={{ width: 240 }}>
                                <Text style={{ fontSize: 21, color: "white", fontWeight: "bold" }}>Overview</Text>
                                <Text style={{ fontSize: 15, color: "white" }}>{movie.synopsis}</Text>
                                <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 4 }} onPress={() => setShowMovieInfo(!showMovieInfo)}>
                                    <Text style={{ fontSize: 14, color: "#ffa500", fontWeight: "bold" }}>MORE INFO</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                        {showMovieInfo ? <View>
                            <Text style={{ fontSize: 23, color: "white", fontWeight: "bold" }}>Movie Info</Text>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, color: "white" }}>Released  : {moment(movie.released).format("MMMM Do YYYY")}</Text>
                                <Text style={{ fontSize: 18, color: "white" }}>Director  : {movie.director}</Text>
                                <Text style={{ fontSize: 18, color: "white" }}>Actors  : {movie.actor}</Text>
                                <Text style={{ fontSize: 18, color: "white" }}>Languages  : {movie.languages}</Text>
                            </View>
                        </View> : null
                        }
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#1b1b1b", padding: 10 }}>

                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("Reviews", { movieId: movieId })}>
                            <Icon name="comment-text-multiple" color="#ffa500" size={28} />
                            <Text style={{ fontWeight: "bold", color: "white" }}>Reviews</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => token == null ? dispatch({ type: "MESSAGE", message:"You must Login/Register before give a review and rating" }) : setShowModal(!showModal)}>
                            <Icon name="star" color="#808080" size={30} />
                            <Text style={{ fontWeight: "bold", color: "white" }}>Rate This</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("Trailer", {urlTrailer : movie.trailer})}>
                            <Icon name="youtube" color="red" size={30} />
                            <Text style={{ fontWeight: "bold", color: "white" }}>Trailer</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ padding: 10, backgroundColor: "#1b1b1b", marginTop: 10, elevation: 2 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
                            Characters
</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' }} style={styles.imgContent} />
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/original/x23Fqkt00uqV2TzfSiB60hrc3HY.jpg' }} style={styles.imgContent} />
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/original/sxSQov8aXGyRCESuFbVtYafvFU4.jpg' }} style={styles.imgContent} />
                            <Image source={{ uri: 'https://image.tmdb.org/t/p/original/5uz9Se5HBxxPdJY38rPfyWUyjDZ.jpg' }} style={styles.imgContent} />
                        </ScrollView>
                    </View>



                </View>
                <AddModal theShowModal={showModal} handleAddModal={() => setShowModal(!showModal)} movieID={movieId} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#212121'
    },
    imgContent: {
        width: 180,
        height: 270,
        marginRight: 10
    },
    imgSubContent: {
        width: 120,
        height: 180,
        marginRight: 10
    },
})


const MovieComponent = (props) => {
    return (
        <View style={{}}>

            <View style={{ padding: 10, backgroundColor: "#1b1b1b", marginTop: 10, elevation: 2 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingRight: 10 }}>
                    <View style={{ flexDirection: "row", width: 200 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>{movie.title} </Text>
                        <Text style={{ fontSize: 25, color: "white", marginLeft: 5 }}>{movieId}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", height: 30 }}>
                        <Icon name="star" color="#ffa500" size={30} />
                        <View style={{ flexDirection: "row", alignItems: "flex-end", }}>
                            <Text style={{ fontSize: 25, color: "white" }}>{movieRating}/</Text>
                            <Text style={{ color: "#808080", paddingBottom: 2 }}>10</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: movie.poster }} style={styles.imgSubContent} />
                    <View style={{ width: 240 }}>
                        <Text style={{ fontSize: 21, color: "white", fontWeight: "bold" }}>Overview</Text>
                        <Text style={{ fontSize: 15, color: "white" }}>{movie.synopsis}</Text>
                        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 4 }} onPress={() => setShowMovieInfo(!showMovieInfo)}>
                            <Text style={{ fontSize: 14, color: "#ffa500", fontWeight: "bold" }}>MORE INFO</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                {showMovieInfo ? <View>
                    <Text style={{ fontSize: 23, color: "white", fontWeight: "bold" }}>Movie Info</Text>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, color: "white" }}>Released  : {movie.released}</Text>
                        <Text style={{ fontSize: 18, color: "white" }}>Director  : {movie.director}</Text>
                        <Text style={{ fontSize: 18, color: "white" }}>Actors  : {movie.actor}</Text>
                        <Text style={{ fontSize: 18, color: "white" }}>Languages  : {movie.languages}</Text>
                        <Text style={{ fontSize: 18, color: "white" }}>Production House  :{movie.released}</Text>
                    </View>
                </View> : null
                }
            </View>


            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#1b1b1b", padding: 10 }}>

                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("Reviews", { movieId: movieId })}>
                    <Icon name="comment-text-multiple" color="#ffa500" size={28} />
                    <Text style={{ fontWeight: "bold", color: "white" }}>Reviews</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: "center" }}>
                    <Icon name="star" color="#808080" size={30} />
                    <Text style={{ fontWeight: "bold", color: "white" }}>Rate This</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => console.log("jhfjh")}>
                    <Icon name="youtube" color="red" size={30} />
                    <Text style={{ fontWeight: "bold", color: "white" }}>Trailer</Text>
                </TouchableOpacity>

            </View>

            <View style={{ padding: 10, backgroundColor: "#1b1b1b", marginTop: 10, elevation: 2 }}>
                <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
                    Characters
           </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' }} style={styles.imgContent} />
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/original/x23Fqkt00uqV2TzfSiB60hrc3HY.jpg' }} style={styles.imgContent} />
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/original/sxSQov8aXGyRCESuFbVtYafvFU4.jpg' }} style={styles.imgContent} />
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/original/5uz9Se5HBxxPdJY38rPfyWUyjDZ.jpg' }} style={styles.imgContent} />
                </ScrollView>
            </View>



        </View>
    )
}