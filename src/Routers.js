import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Comment from './Pages/CommentScreen';
import { MainTabContainer } from './Components/RoutersComponent'

import Login from "./Pages/LoginScreen"
import Register from "./Pages/RegisterScreen"
import Flash from "./Pages/FlashScreen"
import { useSelector, useDispatch } from 'react-redux';
import { checkToken } from './Redux/Actions/AuthAction';
import Message from './Components/Message';
import Loading from './Components/Loading';
import Trailer from './Pages/TrailerScreen';

const MainScreen = createStackNavigator();
const AuthStack = createStackNavigator();

const Routers = () => {

    // const authState = useSelector(state => state.auth)

    // const dispatch = useDispatch()
    // const handleCheckToken = () => dispatch(checkToken())

    const [isFlash, setIsFlash] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setIsFlash(false)
        }, 1000)
    }, [])

    if (isFlash) {
        return <Flash />
    }
    return (
        <>
            <NavigationContainer>
                {/* {authState.token === null ?
                    <AuthStack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <AuthStack.Screen name="Login" component={Login} />
                        <AuthStack.Screen name="Register" component={Register} />
                    </AuthStack.Navigator> */}
                
                    <MainScreen.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: "#292929",
                        },
                        headerTitleStyle: {
                            color: "white"
                        },
                        headerTintColor: '#ffa500'
                    }} >
                        <MainScreen.Screen name="Main" component={MainTabContainer} options={{ headerShown: false }} />
                        <MainScreen.Screen name="Comment" component={Comment} />
                        <MainScreen.Screen name="Trailer" component={Trailer} />
                        <MainScreen.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                        <MainScreen.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                    </MainScreen.Navigator>
                
            </NavigationContainer>
            <Message />
            <Loading />
        </>
    )
}

export default Routers
