import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { TextInput,Avatar, Button, Subheading} from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/auth";
import Citizen from "./Citizen";
import Doctor from "./Doctor";
import Filiasyon from "./Filiasyon";

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        padding: 25
    }
})

export default function SignIn({  }) {

    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [user, setUser] = useState(null) // This user
    const [users, setUsers] = useState([]) // Other Users
    const navigation = useNavigation();
    console.log(user)

    useEffect(() => {
        firestore().collection("users").doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])

    

    return <View>
        <View style={{ padding: 10, paddingTop: 55 }}>
            <Text style={{ fontSize: 24, fontWeight:"600", textAlign: "center" }}>Hoşgeldiniz {user?.name}</Text>
       
       
            <View style={{ alignItems: "center", marginTop: 16 }}>
              <Avatar.Text
              label={user?.name.split(" ").reduce((prev, current) => prev + current[0], "")}
                />  
                </View>
        </View>


        <View style={styles.view}>
            {user?.role == "Doktor" ? (
                <Doctor user={user}/>
            ):
            user?.role == "Hasta" ?
                (<Citizen user={user}/>
            ):(
                <Filiasyon/>
            )}

            

            <View style={{ marginBottom: 40 }}>
                <FlatList
                    data={users}
                    renderItem={({ item }) => <View style={{ borderBottomWidth: 1, borderBottomColor: "#b1b1b1", marginBottom: 20}}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>{item.name}</Text>
                    </View>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        
            <Button onPress={() => firebase.auth().signOut()}>Çıkış</Button>
        </View>

    </View>
}