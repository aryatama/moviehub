import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getMoviesGenre, getMoviesDetails, getProfile } from '../Redux/Actions';
import moment from 'moment';




const Home = ({ navigation }) => {

    const movies = useSelector(state => state.movies)
    const token = useSelector(state => state.auth.token)

    const dispatch = useDispatch()

    const handleGetMovies = () => {
        dispatch(getMovies())
    }
    const handleGetMoviesByGenre = (Genre) => {
        if (Genre !== "All") {
            setSelectedGenre(Genre)
            dispatch(getMoviesGenre(Genre))
            dispatch({ type: "LOADING" })
        } else {
            setSelectedGenre(Genre)
        }

    }
    const handleGetProfile = (token) => {
        dispatch(getProfile(token))
    }


    useEffect(() => {
        { dispatch({ type: "LOADING" }) }
        handleGetMovies()
        if (token !== null) {
            handleGetProfile(token)
        }
    }, [])


    const [selectedGenre, setSelectedGenre] = useState("All")


    const data = [
        "All",
        "Action",
        "Adventure",
        "Comedy",
        "Crime",
        "Drama",
        "Historical",
        "Horor",
        "Musicals",
        "Science",
        "War",
        "Wastern"
    ]

    const Categories = (props) => {
        return (
            <TouchableWithoutFeedback style={{ ...styles.category, backgroundColor: props.backgroundColor }} onPress={() => props.handleSelected()}>
                <Text style={{ ...styles.categoryText, color: props.textColor }}>{props.name}</Text>
            </TouchableWithoutFeedback>
        )
    }


    return (


        <View style={styles.container}>
            <View style={{ marginVertical: 10, height: 40, }}  >
                <FlatList
                    data={data}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Categories
                            textColor={selectedGenre == item ? "black" : "white"}
                            backgroundColor={selectedGenre == item ? "#ffa500" : "#808080"}
                            name={item}
                            handleSelected={() => handleGetMoviesByGenre(item)}
                        />
                    )}
                    keyExtractor={item => `item ${item}`}

                />
            </View>

            <View style={{ width: "100%" }}>
                {selectedGenre == "All" ?
                    <FlatList
                        data={movies.movies.rows}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback style={styles.filmCard} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
                                <Image source={{ uri: item.poster }} style={styles.imgContent} />
                                <View style={{ margin: 10 }}>
                                    <Text style={{ ...styles.categoryText }}>{item.title} </Text>
                                    <Text style={{ fontWeight: "normal", color: "white" }}>{moment(item.released).format("YYYY")} </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => `item ${item.id}`}
                        contentContainerStyle={{

                        }}
                        numColumns={2}
                    /> :
                    <FlatList
                        data={movies.moviesByGenre.rows}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback style={styles.filmCard} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
                                <Image source={{ uri: item.poster }} style={styles.imgContent} />
                                <View style={{ margin: 10 }}>
                                    <Text style={{ ...styles.categoryText }}>{item.title} </Text>
                                    <Text style={{ fontWeight: "normal", color: "white" }}>{moment(item.released).format("YYYY")}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        keyExtractor={item => `item ${item.id}`}
                        contentContainerStyle={{

                        }}
                        numColumns={2}
                    />
                }
            </View>







        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#1b1b1b'
    },
    Content: {
        marginTop: 10,
        height: 50,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    category: {
        padding: 10,
        marginLeft: 7,
        borderRadius: 8

    },
    categoryText: {
        color: "white",
        fontWeight: "bold",
    },
    imgContent: {
        width: 180,
        height: 270,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    filmCard: {
        width: 180,
        marginLeft: 10,
        marginBottom: 11,
        backgroundColor: "#393e46",
        borderRadius: 10,
        elevation: 3
    }
})
