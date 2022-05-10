import React, {Component} from "react";
import { View, Text, FlatList } from "react-native";

  
const Doctor = ({user}) => {
  
     return (
         <View>
             <Text style={{
                 fontSize: 20,
                 marginBottom: 20
             }}
             >
                 Hasta Listesi:
             </Text>
            
             {user?.hastalar.map((h,i)=>
             <Text key={1} >{h}</Text>
             )}
            
         </View>
     )
     }
export default Doctor