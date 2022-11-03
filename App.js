import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Login from "./screens/Login";
import NewsDetail from './screens/NewsDetail';
import Profile from './screens/Profile';
import CourseDetail from './screens/CourseDetail';
import { BookDetail, Home } from './screens';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                {/* Tabs */}
                {/* <Stack.Screen name="Home" component={Tabs} /> */}

                {/* Screens */}
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ headerShown: false }} />
                <Stack.Screen name="CourseDetail" component={CourseDetail} options={{headerShown: false}}/>
                <Stack.Screen name="BookDetail" component={BookDetail} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;