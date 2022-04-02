import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity, FlatList } from 'react-native';
import {TextInputMask} from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker';
import CardEnderecos from '../../Components/CardEnderecos';
import api from '../../Services/api/ApiClientes';
import ModalCadEndereco from '../../Components/ModalCadEndereco';
import { StackActions, useNavigation } from '@react-navigation/native';


export default function CadCliente() {

  const navigation = useNavigation();

  const [modalVisible, setmodalVisible] = useState(false);
  const [nome, setnome] = useState('');
  const [Pickersexo, setPickersexo] = useState('');
  const [dtnascimento, setdtnascimento ] = useState('');
  const [arrayEnderecos, setarrayEnderecos] = useState([]);

      
  const [carregaGenero, setcarregaGenero] = useState([ // Carregamento Dinamico dos PICKERS
  {key: '', nome: 'Selecione seu gênero'},
  {key: 'M', nome: 'Masculino' },
  {key: 'F', nome: 'Feminino'}
  ])

  //#region Função PICKERS Gênero
  let sexoPicker = carregaGenero.map( (valor)  => { // Função para carregar o Picker de forma Dinamica.
    
    return <Picker.Item key={valor.key} value={valor.key} label={valor.nome} color={valor.key === '' ? "gray" : 'black' }/>
  });

  let pickergenero = (opcao) => {
    if (opcao !== ''){
        console.log(opcao)
        setPickersexo(opcao)
    }
  }
  //#endregion

  //#region Finalizar Cadastro
  async function FinalizarCadastro(){

    console.log(dtnascimento);
    await api.post('/api/cliente', {
      nome: nome,
      dataNascimento: dtnascimento,
      sexo: Pickersexo,
      clienteEnderecos: arrayEnderecos
    })
    .then(function (response) {
      alert("Cadastro efetuado com sucesso!");
      setnome('');
      setPickersexo('');
      setdtnascimento('');
      setarrayEnderecos([]);
      navigation.dispatch(StackActions.pop());
      
    })
    .catch(function (error) {
      alert("Erro ao efetuar cadastro" + error);
    });
  }
  //#endregion

  function novoCadastro(){
    setmodalVisible(true);

  }

 return (
    <View style={stlyes.container}>
      <ModalCadEndereco
      modalVisible={modalVisible}
      fechar={ () => setmodalVisible(false)} // MODAL DINAMICO PREENCHER PROPRIEDADES
      salvarEndereco={ (data) => setarrayEnderecos(data) }
      data={arrayEnderecos}
    />
      <View style={stlyes.areaInput} >
        <Text style={stlyes.txtInput}>Nome</Text>
        <TextInput
        style={stlyes.inputCadastro}
        value={nome}
        onChangeText={(texto) => setnome(texto)}
        />
        <Text style={stlyes.txtInput}>Sexo</Text>
        <View style={stlyes.areaPicker} >
        <Picker
          style={stlyes.inputCadastro}
          selectedValue={Pickersexo}
          onValueChange={pickergenero}>
            {sexoPicker}
          </Picker>
        </View>
        <Text style={stlyes.txtInput}>Data de Nascimento</Text>
          <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          style={stlyes.inputCadastro}
          value={dtnascimento}
          onChangeText={ (texto) => setdtnascimento(texto)}
          maxLength={10}
          />
        <View style={stlyes.btn}>
          <Button
          title='Salvar Cadastro'
          onPress={FinalizarCadastro}
          />
        </View>
        <View style={stlyes.btn}>
          <Button
          title='Adicionar novo endereço'
          onPress={novoCadastro}
          />
        </View>
      </View>

      <FlatList 
        data={arrayEnderecos}
        contentContainerStyle={{alignItems:'center'}}
        style={stlyes.scrollEnderecos}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardEnderecos data={item} />}
        />
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
  txtInput:{
    color: "#FFF",
  },
  inputCadastro:{
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  areaInput:{
    width: "60%",
  },
  areaPicker:{
    borderRadius: 6,
    overflow: 'hidden'
  },
  btn:{
    marginTop: "3%"
  },
  scrollEnderecos:{
    flex: 2,
    marginTop: "4%"
},

})