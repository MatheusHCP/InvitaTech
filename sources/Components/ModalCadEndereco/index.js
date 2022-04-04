import React, {useState} from "react";
import {View, Text, TextInput ,TouchableOpacity, Modal, ScrollView, StyleSheet, Button, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from "@react-native-picker/picker";
import api from "../../Services/api/ApiClientes";
import {TextInputMask} from 'react-native-masked-text'
import ApiCEP from "../../Services/api/ApiCEP";


export default function ModalCadEndereco(props){

    const [idEndereco, setidEndereco] = useState();
    const [pickerTipoEndereco, setpickerTipoEndereco] = useState('');
    const [logradouro, setlogradouro] = useState('');
    const [numero, setnumero] = useState('');
    const [bairro, setbairro] = useState();
    const [Complemento, setcomplemento] = useState('');
    const [CEP, setCEP] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');

    const [carregaTipoEnd, setcarregaTipoEnd] = useState([ // Carregamento Dinamico dos PICKERS
    {key: '', nome: 'Selecione o tipo de endereço'},
    {key: 'R', nome: 'Residencial' },
    {key: 'C', nome: 'Comercial'}
    ])

    //#region Função PICKERS Gênero
    let pickerTipoEnd = carregaTipoEnd.map( (valor)  => { // Função para carregar o Picker de forma Dinamica.
    
        return <Picker.Item key={valor.key} value={valor.key} label={valor.nome} color={valor.key === '' ? "gray" : 'black' }/>
    });

    let PickerTipoEnd = (opcao) => {
        if (opcao !== ''){
            console.log(opcao)
            setpickerTipoEndereco(opcao)
        }
    }
    //#endregion

    function fechaModal(){
        props.fechar()
        setpickerTipoEndereco('');
        setlogradouro('');
        setnumero('');
        setbairro('');
        setcomplemento('');
        setCEP('');
        setCidade('');
        setUF('');
    }

    async function buscaCEP(){
        
        const response = await ApiCEP.get(`${CEP}/json/`)
        setCidade(response.data.localidade)
        setUF(response.data.uf)
        setlogradouro(response.data.logradouro)
        setbairro(response.data.bairro)

    }

    async function cadastrarEndereco(){

    const response = await api.get('api/Endereco/MaxID')
    setidEndereco(response.data.resultado.id + 1)

    if(pickerTipoEndereco == '' || logradouro == '' || numero == '' || CEP == '' || Cidade == '' || UF == ''){
        Alert.alert('Cadastro Inválido', 'Necessário preenchimentos dos campos obrigatório.');
    }
    else{
        if(props.id === 0){
            console.log('entrou no IF')

            const data = {
                id: idEndereco,
                idCliente: 0,
                tipoEndereco: pickerTipoEndereco,
                cep: CEP,
                logradouro: logradouro,
                numero: numero,
                complemento: Complemento,
                bairro: bairro,
                cidade: Cidade,
                uf: UF
            };
            console.log(data);
                props.salvarEndereco((oldTasks => [...oldTasks, data]))
                
            fechaModal();

        }else{
            console.log('entrou no else')
            const data = {
                id: 0,
                idCliente: props.id,
                tipoEndereco: pickerTipoEndereco,
                cep: CEP,
                logradouro: logradouro,
                numero: numero,
                complemento: Complemento,
                bairro: bairro,
                cidade: Cidade,
                uf: UF
            };
            console.log(data);
                props.salvarEndereco((oldTasks => [...oldTasks, data]))
                
            fechaModal();
            }
        }
    }

    return(
    <Modal transparent={true} animationType='slide' visible={props.modalVisible}>
        <View style={styles.modalChamado} >
        <TouchableOpacity style={styles.btnFecharModal} onPress={ fechaModal }>
            <Ionicons name='close-outline' size={36} color="#000"/>
        </TouchableOpacity>
        <View style={styles.areaTitulo}>
            <Text style={styles.txtTitulo}>Cadastro de Endereço</Text>
        </View>
        <View>
            <Picker
            selectedValue={pickerTipoEndereco}
            onValueChange={PickerTipoEnd}
            >
                {pickerTipoEnd}
            </Picker>
        </View>
        <ScrollView style={styles.areaInputModal} contentContainerStyle={{alignItems:"center"}}>
            <Text style={styles.txtCEP}>CEP</Text>
                <TextInputMask
                type='zip-code'
                placeholder="Obrigatório"
                style={styles.inputTEXT}
                value={CEP}
                onChangeText={(texto) => setCEP(texto)}
                onEndEditing={buscaCEP}
                />
            <Text style={styles.txtCidade}>Cidade</Text>
                <TextInput
                placeholder="Obrigatório"
                style={styles.inputTEXT}
                value={Cidade}
                onChangeText={(texto) => setCidade(texto)}
                />
            <Text style={styles.txtUF}>UF</Text>
                <TextInput
                placeholder="Obrigatório"
                style={styles.inputTEXT}
                value={UF}
                onChangeText={(texto) => setUF(texto)}
                />
            <Text style={styles.txtLogradouro}>Logradouro</Text>
                <TextInput
                placeholder="Obrigatório"
                style={styles.inputTEXT}
                value={logradouro}
                onChangeText={(texto) => setlogradouro(texto)}
                />
            <Text style={styles.txtNumero}>Número</Text>
                <TextInput
                placeholder="Obrigatório"
                style={styles.inputTEXT}
                value={numero}
                onChangeText={(texto) => setnumero(texto)}
                />
            <Text style={styles.txtBairro}>Bairro</Text>
                <TextInput
                placeholder="Opcional"
                style={styles.inputTEXT}
                value={bairro}
                onChangeText={(texto) => setbairro(texto)}
                />
            <Text style={styles.txtComplemento}>Complemento</Text>
                <TextInput
                placeholder="Opcional"
                style={styles.inputTEXT}
                value={Complemento}
                onChangeText={(texto) => setcomplemento(texto)}
                />
            <View style={styles.btnSalvar}>
                <Button
                title="Salvar Endereço"
                onPress={cadastrarEndereco}
                />
            </View>
        </ScrollView>
        </View>
    </Modal>
)
}

const styles = StyleSheet.create({
    modalChamado:{
        flex: 1,
        backgroundColor: '#C4C4C4',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        marginTop: "3%",
    },
    btnFecharModal:{
        marginTop: "4%",
        marginLeft: "87%"
    },
    areaTitulo:{
        alignItems: "center"
    },
    txtTitulo:{
        fontSize: 20,
        color: "#000"
    },
    inputTEXT:{
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: "#FFF",
        width: '80%'
    },
    areaInputModal:{
        width: '100%',
    },
    txtLogradouro:{
        marginLeft: '-62%'
    },
    txtNumero:{
        marginLeft: '-67%'
    },
    txtBairro:{
        marginLeft: '-70%'
    },
    txtComplemento:{
        marginLeft: '-58%'
    },
    txtCEP:{
        marginLeft: '-73%'
    },
    txtUF:{
        marginLeft: '-74%'
    },
    txtCidade:{
        marginLeft: '-70%'
    },
    btnSalvar:{
        width: "60%",
        marginVertical: "5%"
    }
})