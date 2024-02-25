import { View, Text } from 'react-native'
import React from 'react'
import { create } from 'react-test-renderer'
import {createStackNavigator}  from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from '../screen/Splash'
import Main from '../screen/Main'

import Home from '../tab/Home'
import User from '../tab/User'
import Wishlist from '../tab/Wishlist'
import Login from '../screen/Login'
import Signup from '../screen/Signup'
import Cart from '../tab/Cart'

import SplashScreen from '../screen/Splash'
import ProductDetails from '../tab/ProductDetails'
import UserScreen from '../screen/UserScreen'
import CheckOut1 from '../screen/CheckOut1'
import MyAddress from '../screen/MyAddress'
import AddAdress from '../screen/AddAdress'
import Success from '../screen/Success'

const stack=createStackNavigator()
const AppNavigation = () => {  
  return (
   <NavigationContainer>
    <stack.Navigator>
        <stack.Screen  name='Splash' component={SplashScreen} options={{headerShown:false}}/>
        <stack.Screen  name='Main' component={Main} options={{headerShown:false}}/>
        <stack.Screen  name='Login' component={Login} options={{headerShown:false}}/>
        <stack.Screen  name='Signup' component={Signup} options={{headerShown:false}}/>
        <stack.Screen  name='Cart' component={Cart} options={{headerShown:false}}/>
        <stack.Screen  name='UserScreen' component={UserScreen} options={{headerShown:false}}/>
        <stack.Screen  name='CheckOut1' component={CheckOut1} options={{headerShown:false}}/>
        <stack.Screen  name='Home' component={Home} options={{headerShown:false}}/>
        <stack.Screen  name='MyAddress' component={MyAddress} />
        <stack.Screen  name='AddAdress' component={AddAdress} />
        <stack.Screen  name='Success' component={Success} />
        <stack.Screen  name='ProductDetails' component={ProductDetails} options={{headerShown:false}}/>
    </stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigation