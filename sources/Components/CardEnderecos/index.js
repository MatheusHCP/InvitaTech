import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CardEnderecos({data}) {
 return (
   <View style={styles.container}>
       <View style={styles.areaNome}>
           <View>
                <Text style={styles.txtTipoNumero}> Logradouro</Text>
                <Text style={styles.txtnomePessoa}> {data.logradouro}</Text>
           </View>
       </View>
       <View style={styles.areaNumBairro}> 
           <View>
                <Text style={styles.txtTipoNumero}> N° </Text>
                <Text style={styles.txtNumero}> {data.numero} </Text>
           </View>
           <View style={styles.areaBairro}>
                <Text style={styles.txtTipoEndereco}> Bairro</Text>
                <Text style={styles.txtBairro}> {data.bairro} </Text>
           </View>
       </View>
       <View style={styles.area3}> 
           <View>
                <Text style={styles.txtTipoNumero}> Complemento </Text>
                <Text style={styles.txtNumero}> {data.complemento} </Text>
           </View>
           <View style={styles.areaBairro}>
                <Text style={styles.txtTipoEndereco}> CEP</Text>
                <Text style={styles.txtBairro}> {data.cep} </Text>
           </View>
           <View style={styles.areaTipoEndereco}>
                <Text style={styles.txtTipoEnd}> Tipo de Endereço</Text>
                <Text style={styles.txtResultTipoEnd}> {data.tipoEndereco === 'R' ? "Residencia" : "Comercial"}  </Text>
           </View>
       </View>
       <View style={styles.areaCidadeUF}> 
           <View>
                <Text style={styles.txtTipoNumero}> Cidade </Text>
                <Text style={styles.txtNumero}> {data.cidade} </Text>
           </View>
           <View style={styles.areaUF}>
                <Text style={styles.txtUF}> UF</Text>
                <Text style={styles.txtresultUF}> {data.uf} </Text>
           </View>
       </View>
       {/* <TouchableOpacity style={styles.btnEditarModal}>
            <Ionicons name='create-outline' size={40} color="#000"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFecharModal} >
            <Ionicons name='trash' size={40} color="#000"/>
        </TouchableOpacity> */}
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
    }

})