// In App.js in a new project

import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//screens
import Login from './../screens/Login';
import Home from './../screens/Home';
import Auto from './../screens/Auto';
import Personal from './../screens/Personal';
import Journal from './../screens/Journal';
import Routes from './../screens/Routes';
import Help from './../screens/Help';

const Stack = createNativeStackNavigator();

import {Octicons} from '@expo/vector-icons';

import {Colors} from '../components/styles';
const {brand, darkLight, primary, lightBlue, blue} = Colors;


const RootStack = () => {
    return (
        <NavigationContainer>
          
            <Stack.Navigator>
                <Stack.Screen 
                name="login" 
                component={Login}
                options={{
                    headerShown: false, 
                  }}
                />
                <Stack.Screen name="home" 
                    component={Home}
                    options={{
                        headerShown: false, 
                     }}/>
                <Stack.Screen name="auto" component={Auto} 
                    options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: blue,
                         },
                     }}/>
                <Stack.Screen name="personal" component={Personal}/>
                <Stack.Screen name="journal" component={Journal}/>
                <Stack.Screen name="routes" component={Routes}/>
                <Stack.Screen name="help" component={Help} />

            </Stack.Navigator>
           
        </NavigationContainer>
    );
};

export default RootStack;