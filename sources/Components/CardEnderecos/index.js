import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from '../../Services/api/ApiClientes';

export default function CardEnderecos(props) {

async function excluirEndereco(){
    await api.delete(`api/Endereco?idendereco=${props.data.id}`)
    .then(function (response){
        alert("Endereço excluido com sucesso!")
        props.atualizaEndereco()
    })
    .catch(function (error){
        alert("Falha ao excluir endereço: " + error)
    })
}


 return (
   <View style={styles.container}>
       <TouchableOpacity onPress={props.alterardados} >
       <View style={styles.areaNome}>
           <View>
                <Text style={styles.txtTipoNumero}> Logradouro</Text>
                <Text style={styles.txtnomePessoa}> {props.data.logradouro}</Text>
           </View>
       </View>
       <View style={styles.areaNumBairro}> 
           <View>
                <Text style={styles.txtTipoNumero}> N° </Text>
                <Text style={styles.txtNumero}> {props.data.numero} </Text>
           </View>
           <View style={styles.areaBairro}>
                <Text style={styles.txtTipoEndereco}> Bairro</Text>
                <Text style={styles.txtBairro}> {props.data.bairro === '' ? 'Não informado' : props.data.bairro} </Text>
           </View>
       </View>
       <View style={styles.area3}> 
           <View>
                <Text style={styles.txtTipoNumero}> Complemento </Text>
                <Text style={styles.txtNumero}> {props.data.complemento === '' ? 'Não informado' : props.data.complemento} </Text>
           </View>
           <View style={styles.areaCompCEP}>
                <Text style={styles.txtTipoEndereco}> CEP</Text>
                <Text style={styles.txtBairro}> {props.data.cep} </Text>
           </View>
           <View style={styles.areaTipoEndereco}>
                <Text style={styles.txtTipoEnd}> Tipo de Endereço</Text>
                <Text style={styles.txtResultTipoEnd}> {props.data.tipoEndereco === 'R' ? "Residencia" : "Comercial"}  </Text>
           </View>
       </View>
       <View style={styles.areaCidadeUF}> 
           <View>
                <Text style={styles.txtTipoNumero}> Cidade </Text>
                <Text style={styles.txtNumero}> {props.data.cidade} </Text>
           </View>
           <View style={styles.areaUF}>
                <Text style={styles.txtUF}> UF</Text>
                <Text style={styles.txtresultUF}> {props.data.uf} </Text>
           </View>
       </View>     
        <TouchableOpacity style={styles.btnExcluirEndereco} onPress={excluirEndereco} >
            <Ionicons name='trash' size={26} color="#000"/>
        </TouchableOpacity> 
       </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width: "110%",
        height: 250,
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
    areaCompCEP:{
        marginLeft: "33%",
        marginTop: "-12.5%"
    },
    txtresultCEP:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "50%",
        marginTop: "1%",
    },
    txtCEP:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "50%",
        marginTop: "2.5%"
    },
    areaTipoEndereco:{
        marginLeft: "60%",
        marginTop: "-12%"
    },
    txtTipoEnd:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "4%",
        marginTop: "2%"
    },   
    txtResultTipoEnd:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "4%",
        marginTop: "1%",
    },
    areaUF:{
        marginLeft: "50%",
        marginTop: "-12%"
    },
    txtUF:{
        fontSize: 10,
        color: '#000000',
        marginLeft: "50%",
        marginTop: "2.5%"
    },
    txtresultUF:{
        color: "#000",
        fontWeight: 'bold', 
        marginLeft: "50%",
        marginTop: "1%",
    },
    areaNumBairro:{
        marginTop:"1%"
    },
    areaCidadeUF:{
        marginTop: "4%"
    },
    area3:{
        marginTop: "2%"
    },
    btnEditarModal:{
        marginLeft: "15%",
        marginTop: "3%"
    },
    btnFecharModal:{
        marginLeft: "50%",
        marginTop: "-10%"
    },
    btnExcluirEndereco:{
        marginLeft: "46%",
        marginTop: '5%'
    }

})