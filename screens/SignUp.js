import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, Subheading} from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import TextBox from "../components/TextBox"
import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/compat/firestore";


const SignUp = () => {
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    const navigation = useNavigation();
  
    const createAccount = async () => {
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
          firestore().collection("users").doc(auth().currentUser.uid).set({
            uid: auth().currentUser.uid,
            name,
            role,
            email
        })
        await response.user.updateProfile({ displayName: name });
        navigation.navigate('SignIn');
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    };
  
    return (
      <View style={{ margin: 16 }}>
        {!!error && (
          <Subheading
            style={{ color: "red", textAlign: "center", marginBottom: 16 }}
          >
            {error}
          </Subheading>
        )}
        <TextInput
          label="Ad"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Unvan"
          style={{ marginTop: 12 }}
          value={role}
          onChangeText={(text) => setRole(text)}
        />
        <TextInput
          label="E Mail"
          style={{ marginTop: 12 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          label="Parola"
          style={{ marginTop: 12 }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Button compact onPress={() => navigation.navigate("SignIn")}>
            Giriş
          </Button>
          <Button
            mode="contained"
            onPress={() => createAccount()}
            loading={isLoading}
          >
           Kayıt Ol
          </Button>
        </View>
      </View>
    );
  };
  
  export default SignUp;