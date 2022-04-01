import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';

export default function CardCliente({data}) {
 return (
   <View style={styles.container}>
       <View style={styles.areaNome} >
           <Text style={styles.txtnomePessoa}> {data.nome} </Text>
       </View>
       <View style={styles.areaNumBairro}> 
           <View>
                <Text style={styles.txtTipoNumero}> Sexo</Text>
                <Text style={styles.txtNumero}> { data.sexo == 'F' ? 'Feminino' : 'Masculino' } </Text>
           </View>
           <View style={styles.areaBairro}>
                <Text style={styles.txtTipoEndereco}> Data de Nascimento</Text>
                <Text style={styles.txtBairro}> {data.dataNascimento} </Text>
           </View>
       </View>
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
    }

})