import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Logo from "../Components/Logo"

export default function Flash() {
    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ffa500" />
            </View>
            <Text style={{  color: "white", fontSize: 19, letterSpacing: 2, textAlign:"center", marginVertical: 30, paddingHorizontal:30}}>Find ratings and reviews for the newest movie.</Text>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:"#292929"
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    textLoading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",

    },
    loading: {
        marginTop: 380,
        justifyContent: "center",
        alignItems: "center",
    }

})
