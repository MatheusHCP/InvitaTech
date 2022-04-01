import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardCliente from '../../Components/CardCliente';
import api from '../../Services/api/ApiClientes';


export default function TelaInicial() {

    const [resultadoapi, setresultadoapi] = useState([]);
    const [txtPesquisar, settxtPesquisar] = useState('');
    const navigation = useNavigation();

async function pesquisar(){
    try{
        const response = await api.get(`/api/Cliente?descricao=${txtPesquisar}`)
        setresultadoapi(response.data.resultado);
        console.log(resultadoapi);
    }
    catch(error){
        alert(error)
    }
}

 return (
   <View style={styles.container} > 
        <View style={styles.areaPesquisa}>
            <View style={styles.areaInputPesquisa} >
                <TextInput
                placeholder='Escreva o nome do cliente'
                style={styles.txtPesquisa}
                onChangeText={(texto) => settxtPesquisar(texto)}
                />
            </View>
            <View style={styles.areabutton} >
                <Button
                title='Pesquisar'
                onPress={pesquisar}
                />
            </View>
        </View>
        <View style={styles.areabtnCadastrar} >
            <Button
            title='Cadastrar novo cliente'
            onPress={() => {navigation.navigate('CadastrarCliente')}}
            />
        </View>
        
        <FlatList 
        data={resultadoapi}
        contentContainerStyle={{alignItems:'center'}}
        style={styles.scrollClientes}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false} 
        renderItem={({item}) => <CardCliente data={item}/>} 
        />

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#2d0f00"
    },
    areaPesquisa:{
        flexDirection: 'row',
        marginTop: "3%",
        justifyContent: 'center',
    },
    areaInputPesquisa:{
        width: "60%"
    },
    areabutton:{
        marginTop: "2%" ,
        marginLeft: "5%"
    },
    txtButton:{
        height: 30,
        marginLeft: 20
    },
    txtPesquisa:{
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: "#FFF"
    },
    scrollClientes:{
        flex: 5,
        marginTop: "8%",    
    },
    areabtnCadastrar:{
        marginTop: "2%"
    }

})