import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './sources/pages/TelaInicial';
import CadCliente from './sources/pages/Clientes/CadCliente';


export default function App() {

  const Stack = createNativeStackNavigator();

 return (
  <NavigationContainer>
    <Stack.Navigator>
    
        <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          headerShown: false
        }}
        />

        <Stack.Screen
        name="CadastroCliente"
        component={CadCliente}
        options={{
          headerShown: false
        }}
        />

    </Stack.Navigator>
  </NavigationContainer>
  );
}