import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/compat/firestore";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    const navigation = useNavigation();
  
    const signIn = async () => {
      setIsLoading(true);
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        navigation.popToTop();
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
          label="E Mail"
          style={{ marginTop: 12 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          <Button compact onPress={() => navigation.navigate("SignUp")}>
            Kayıt Ol
          </Button>
          <Button mode="contained" onPress={() => signIn()} loading={isLoading}>
            Giriş
          </Button>
        </View>
      </View>
    );
  };
  
  export default SignIn;