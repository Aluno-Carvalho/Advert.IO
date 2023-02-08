import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/Register.js";
import {createStackNavigator} from "@react-navigation/stack";
import * as firebase from "firebase";
import { firebaseConfig } from "./firebase";

if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
}

else{
  firebase.app()
}

const Stack = createStackNavigator()

const StackNav = () =>{
  return(
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name= "Login" component = {LoginScreen}></Stack.Screen>
      <Stack.Screen name= "Register" component = {RegisterScreen}></Stack.Screen>
      <Stack.Screen name= "Drawer" component = {DrawerNavigator}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}