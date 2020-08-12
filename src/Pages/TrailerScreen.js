import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'

export default function Trailer({ route }) {

    const { urlTrailer } = route.params
    return (
        <WebView source={{ uri: urlTrailer }} />
    )
}

const styles = StyleSheet.create({})
