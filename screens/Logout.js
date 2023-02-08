import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

import firebase from "firebase";

export default class Logout extends Component {
    componentDidMount(){
        firebase.auth().signOut()
        this.props.navigation.replace("Login")
    }
    render(){
        return(
            <View>
                <Text>Logout</Text>
            </View>
        )
    }
}