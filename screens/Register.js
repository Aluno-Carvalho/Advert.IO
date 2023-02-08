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
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmSenha: "",
      nome: "",
      sobrenome: "",
      fontsLoaded: false
    };
  }

registrar = (email, password, confirmSenha, nome, sobrenome) =>{
  if(password === confirmSenha){
  firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential)=> {
    Alert.alert("Você foi registrado com sucesso")
    this.props.navigation.replace("Login")
    console.log(userCredential.user.uid)
    firebase.database().ref(("/usuarios/"+ userCredential.user.uid)).set({
      email: userCredential.user.email,
      nome: nome,
      sobrenome: sobrenome
    })
  })
  .catch(error => {
    Alert.alert(error.message)
  })
  }

  else{
    Alert.alert("As senhas não são iguais")
  }
}

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, confirmSenha, nome, sobrenome} = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>Registrar</Text>

          {/* Adicione código para criar mais duas entradas de texto para nome e sobrenome */}

          <TextInput
          style={styles.textinput}
          onChangeText={text => this.setState({ nome: text })}
          placeholder={"Digite o nome"}
          placeholderTextColor={"#FFFFFF"}
          ></TextInput>

          <TextInput
          style={styles.textinput}
          onChangeText={text => this.setState({ sobrenome: text })}
          placeholder={"Digite o sobrenome"}
          placeholderTextColor={"#FFFFFF"}
          ></TextInput>

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Digite o e-mail"}
            placeholderTextColor={"#FFFFFF"}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Digite a senha"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />

          {/* Adicione o código para criar mais uma entrada de texto para confirmar a senha */}

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ confirmSenha: text })}
            placeholder={"Confirme a senha"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />


          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress = {() => this.registrar(email, password, confirmSenha, nome, sobrenome)}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20)
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});