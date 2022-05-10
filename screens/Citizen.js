import React, { Component,useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/auth";


const Citizen =({user})=> {

    // useEffect(() => {
      //   if (user)
        //    firestore().collection("users").where("")
          //       .onSnapshot(users => {
            //         if (!users.empty) {
              //           const USERS = []

                //         users.forEach(user => {
                  //           USERS.push(user.data())
                    //     })

                      //   setUsers(USERS)
                     //}
                // })
     //}, [user])

    return (
      <View>
         <Text style={{
                fontSize: 20,
                marginBottom: 20
            }}
            >
                Doktorunuz : 
              
                
            </Text>
            {user?.doctor.map((j,k)=>
             <Text key={1} >{j}</Text>
             )}
          
      </View>
    );
}

export default Citizen