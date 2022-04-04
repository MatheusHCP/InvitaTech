import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import {TextInputMask} from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker';
import CardEnderecos from '../../Components/CardEnderecos';
import api from '../../Services/api/ApiClientes';
import ModalCadEndereco from '../../Components/ModalCadEndereco';
import { StackActions, useNavigation } from '@react-navigation/native';


export default function CadCliente(props) {

  const navigation = useNavigation();

  const [modalVisible, setmodalVisible] = useState(false);
  const [nome, setnome] = useState('');
  const [id, setid] = useState(props.route.params.id)
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

  async function FinalizarCadastro(){

    if(Pickersexo == undefined || dtnascimento == undefined || nome == undefined || Pickersexo == '' || dtnascimento == '' || nome == ''){
      Alert.alert('Cadastro inválido','Necessário preenchimento de todos os campos do cadastro.');
    }
    else{
      if(id == 0){
        console.log('ENTROU CADASTRAR CLIENTE')
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
  
      }else
      {
        console.log('ENTROU NO ALTERAR CLIENTE')
        await api.put('/api/cliente',{
          id: props.route.params.id,
          nome: nome,
          dataNascimento: dtnascimento,
          sexo: Pickersexo,
          clienteEnderecos: arrayEnderecos
        })
        .then(function (response){
          alert('Cadastro alterado com sucesso!');
          setnome('');
          setPickersexo('');
          setdtnascimento('');
          setarrayEnderecos([]);
          navigation.dispatch(StackActions.pop());
        })
        .catch(function (error){
          alert(error);
        })
      }
    }
  }

  function novoCadastro(){
    setmodalVisible(true);
  }

  function alterarEndereco(){
    setmodalVisible(true)

  }

  async function alterarCadastro(){
    setnome('');
    setPickersexo('');
    setdtnascimento('');
    setnome(props.route.params.nome);
    setPickersexo(props.route.params.sexo);
    setdtnascimento(props.route.params.dtNascimento);
    const response = await api.get(`/api/Endereco?idCliente=${props.route.params.id}`)
    setarrayEnderecos(response.data.resultado)
  }

  async function atualizaEnderecos(){
    setarrayEnderecos([]);
    const response = await api.get(`/api/Endereco?idCliente=${props.route.params.id}`)
    setarrayEnderecos(response.data.resultado)
  }

  useEffect( () => {
    
  if(props.route.params.id !== 0){ // Editar Cadastro
    alterarCadastro();
  }


  }, [props.route.params.id] )


 return (
    <View style={styles.container}>
      <ModalCadEndereco
      modalVisible={modalVisible}
      fechar={ () => setmodalVisible(false)} // MODAL DINAMICO PREENCHER PROPRIEDADES
      salvarEndereco={ (data) => setarrayEnderecos(data) }
      data={arrayEnderecos}
      id={`${id}`}
    />
      <View style={styles.areaInput} >
        <Text style={styles.txtInput}>Nome</Text>
        <TextInput
        style={styles.inputCadastro}
        value={nome}
        onChangeText={(texto) => setnome(texto)}
        />
        <Text style={styles.txtInput}>Sexo</Text>
        <View style={styles.areaPicker} >
        <Picker
          style={styles.inputCadastro}
          selectedValue={Pickersexo}
          onValueChange={pickergenero}>
            {sexoPicker}
          </Picker>
        </View>
        <Text style={styles.txtInput}>Data de Nascimento</Text>
          <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          style={styles.inputCadastro}
          value={dtnascimento}
          onChangeText={ (texto) => setdtnascimento(texto)}
          maxLength={10}
          />
        <View style={styles.btn}>
          <Button
          title='Salvar Cadastro'
          onPress={FinalizarCadastro}
          />
        </View>
        <View style={styles.btn}>
          <Button
          title='Adicionar novo endereço'
          onPress={novoCadastro}
          />
        </View>
      </View>
      <Text style={styles.txtListaEnderecos}>Lista de Endereços</Text>
      <FlatList 
        data={arrayEnderecos}
        contentContainerStyle={{alignItems:'center'}}
        style={styles.scrollEnderecos}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardEnderecos data={item} atualizaEndereco={atualizaEnderecos} alterardados={alterarEndereco} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#837575",
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
txtListaEnderecos:{
  color: '#fff',
  fontSize: 20,
  marginTop: "2%"
}

})