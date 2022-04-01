import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function cadNovoCliente() {
 return (
    <View style={stlyes.container}>
        <Text>
            CadNovoCliente
        </Text>
    </View>
  );
}

const stlyes = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#2d0f00",
    justifyContent: 'center',
    alignItems: 'center'
},
})