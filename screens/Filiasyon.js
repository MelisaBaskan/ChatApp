import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Filiasyon = ({ user }) => {


    return (
        <View>
            <Text style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 20
            }}
            >
                Hasta Listesi
            </Text>
            <Text>{user?.hastalar}</Text>
           
        </View>
    );
}

export default Filiasyon