import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Home from '../Pages/HomeScreen';
import Comment from '../Pages/CommentScreen';
import Profile from '../Pages/ProfileScreen';
import Search from '../Pages/SearchScreen';
import MovieDetails from '../Pages/MovieDetailsScreen';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontA from 'react-native-vector-icons/FontAwesome';
import Reviews from '../Pages/ReviewsScreen';
import AsyncStorage from '@react-native-community/async-storage';



export const LogoTitle = (props) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Movie</Text>
        <View style={{ backgroundColor: "#ffa500", marginLeft: 2, paddingLeft: 2, paddingRight: 2, borderRadius: 3 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1b1b1b" }}>hub</Text>
        </View>
    </View>
)

export const SearchIcon = () => {
    const navigation = useNavigation()
    
    return (
        <TouchableWithoutFeedback onPress={() =>  navigation.navigate("Search")} >
            <IconFontA name="search" size={25} color="#808080" style={{ marginRight: 10 }} />
        </TouchableWithoutFeedback>
    )
}

const MainTab = createBottomTabNavigator();
export const MainTabContainer = () => (
    <MainTab.Navigator
        tabBarOptions={{
            showLabel: false,
            activeTintColor: '#ffa500',
            style: {
                backgroundColor: '#292929',
                borderTopColor: "transparent"

            },

        }}>
        <MainTab.Screen name="Home" component={HomeContainer} options={{
            tabBarIcon: ({ color }) => (
                <Icons name="home" color={color} size={35} />
            )
        }} />
        <MainTab.Screen name="Comment" component={CommentContainer} options={{
            tabBarIcon: ({ color }) => (
                <Icons name="comment-multiple" color={color} size={30} />
            )
        }} />
        <MainTab.Screen name="Profile" component={ProfileContainer} options={{
            tabBarIcon: ({ color }) => (
                <Icons name="account" color={color} size={35} />
            )
        }} />
    </MainTab.Navigator>
)

const HomeStack = createStackNavigator();
export const HomeContainer = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#292929",
            },
            headerTitleStyle: {
                color: "white"
            },
            headerTintColor: '#ffa500'
        }}
    >
        <HomeStack.Screen name="Home" component={Home} options={{
            headerTitle: props => (<LogoTitle {...props} />),
            headerTitleAlign: "center",
            headerRight: props => (<SearchIcon {...props} />)
        }} />
        <HomeStack.Screen name="MovieDetails" component={MovieDetails} options={{
            headerTitle: props => (<LogoTitle {...props} />),
            headerTitleAlign: "center",
            headerRight: props => (<SearchIcon {...props} />),

        }}
        />
        <HomeStack.Screen name="Search" component ={Search} options={{headerShown:false}} />
        <HomeStack.Screen name="Reviews" component ={Reviews}/>
    </HomeStack.Navigator>
)
const ProfileStack = createStackNavigator();
export const ProfileContainer = () => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#292929",
        },
        headerTitleStyle: {
            color: "white"
        }
    }}>
        <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
)
const CommentStack = createStackNavigator();
export const CommentContainer = () => (
    <CommentStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#292929",
        },
        headerTitleStyle: {
            color: "white"
        }
    }}>
        <CommentStack.Screen name="Comment" component={Comment} />
    </CommentStack.Navigator>
)