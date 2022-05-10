import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "./screens/SignIn"
import SignUp from "./screens/SignUp"
import Home from "./screens/Home"
import Chat from "./screens/Chat"
import ChatList from "./screens/ChatList"
import Settings from "./screens/Settings"
import Giris from './screens/Giris';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider, DefaultTheme } from "react-native-paper";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyDHIXrcbFtZOcCXL7SPn4Zi_bNJ4qEYB0s",
    authDomain: "chat-app-7cd70.firebaseapp.com",
    projectId: "chat-app-7cd70",
    storageBucket: "chat-app-7cd70.appspot.com",
    messagingSenderId: "341948841370",
    appId: "1:341948841370:web:0deb2cb04ed31b19a04e23"
};

firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
 useEffect(() => {
   firebase.auth().onAuthStateChanged((user) => {
     if (!user) {
        navigation.navigate("SignUp");
      }
   });
  }, []);

  
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === "Mesajlar" ? "chatbubbles" : "settings"}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="Mesajlar" component={ChatList} />
      <Tabs.Screen name="Ana Sayfa" component={Home} />
    </Tabs.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196f3",
    accent: "#e91e63",
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;