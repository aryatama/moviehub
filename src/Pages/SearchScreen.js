import React from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontA from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux';
import { getMoviesSearch } from '../Redux/Actions';



export default function Search({ navigation }) {

    const movies = useSelector(state => state.movies.searchMovies)
    const dispatch = useDispatch()

    const handleGetMoviesBySearch = (search) => {
        dispatch(getMoviesSearch(search))
        console.log(movies)
    }

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                    <IconMaterial name="arrow-back" size={30} color="#ffa500" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <View style={styles.textInput}>
                    <IconFontA name="search" size={23} color="rgba(0,0,0, 0.7)" />
                    <TextInput placeholder="Search" onChangeText={e => handleGetMoviesBySearch(e)} />
                </View>
            </View>
            
            {/* <View style={{ width:"100%" }}>
                <FlatList
                    data={movies.rows}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback style={styles.filmCard} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
                            <Image source={{ uri: item.poster }} style={styles.imgContent} />
                            <View style={{ margin: 10 }}>
                                <Text style={{ ...styles.categoryText }}>{item.title} </Text>
                                <Text style={{ fontWeight: "normal", color: "white" }}>{item.released} </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => `item ${item.id}`}
                   
                    numColumns={2}
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#1b1b1b'
    },
    textInput: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
        width: "80%",
        borderRadius: 50,
        backgroundColor: "#808080",
        elevation: 3

    }, categoryText: {
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
