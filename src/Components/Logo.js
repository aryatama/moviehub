import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'

export default function Logo() {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop:120 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>Movie</Text>
                <View style={{ backgroundColor: "#ffa500", marginLeft: 5, paddingLeft: 5, paddingRight:5, borderRadius: 8 }}>
                    <Text style={{ fontSize: 40, fontWeight: "bold", color: "#1b1b1b" }}>hub</Text>
                </View>
            </View>
            <Text style={{ color: "white", fontSize: 18, letterSpacing: 12 }}>community</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
