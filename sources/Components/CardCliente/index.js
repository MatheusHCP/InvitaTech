import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api/ApiClientes'

export default function CardCliente(props) {

    async function excluirCliente(){

        await api.delete(`api/Cliente?id=${props.idCliente}`)
        .then(function(response){
            alert(
                'Cliente excluido com sucesso!'
            )
            props.atualizacliente()
        })
        .catch(function(response){
            alert(
                "Erro ao excluir cliente: " + response
            )
        })
    }
    
    function AlertaExcluirCliente(){
        Alert.alert(
            "Excluir cliente",
            "Deseja excluir o cliente?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Excluir", onPress: () => excluirCliente() }
            ]
          );
    }

 return (
   <View style={styles.container}>

       <TouchableOpacity onPress={props.alterarCliente} >
       <View style={styles.areaNome} >
           <Text style={styles.txtnomePessoa}> {props.data.nome} </Text>
       </View>
       <View style={styles.areaNumBairro}> 
           <View>
                <Text style={styles.txtTipoNumero}> Sexo</Text>
                <Text style={styles.txtNumero}> { props.data.sexo == 'F' ? 'Feminino' : 'Masculino' } </Text>
           </View>
           <View style={styles.areaBairro}>
                <Text style={styles.txtTipoEndereco}> Data de Nascimento</Text>
                <Text style={styles.txtBairro}> {props.data.dataNascimento} </Text>
           </View>
       </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btnExcluirCliente} onPress={AlertaExcluirCliente}  >
            <Ionicons name='trash' size={26} color="#000"/>
        </TouchableOpacity> 
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width: 310,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#FFF",
        marginBottom: "3%"
    },
    areaNome:{
        marginTop: "2%"
    },
    txtnomePessoa:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "4%",
        marginTop: "1%",
    },
    txtTipoEndereco:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "4%",
        marginTop: "2%"
    },
    txtEndereco:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "4%",
        marginTop: "1%",
    },
    txtTipoNumero:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "4%",
        marginTop: "2%"
    },   
    txtNumero:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "4%",
        marginTop: "1%",
    },   
    txtTipoBairro:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "4%",
        marginTop: "2%"
    },
    txtBairro:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "4%",
        marginTop: "1%",
    },
    areaBairro:{
        marginLeft: "30%",
        marginTop: "-13%"
    },
    btnExcluirCliente:{
        marginLeft: '80%',
        marginTop: '-15%'
    }

})