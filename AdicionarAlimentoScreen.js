import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from './firebase';

const ListaAlimentosScreen = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [nome, setNome] = useState('');
  const [calorias, setCalorias] = useState('');
  const [descricao, setDescricao] = useState('');
  const [alimentoAdicionado, setAlimentoAdicionado] = useState(false);

  const handleAdicionarAlimentoPress = () => {
    const novoAlimento = {
      name: nome,
      caloria: calorias,
      descricao: descricao,
    };

    db.collection('alimentos')
      .add(novoAlimento)
      .then((docRef) => {
        setAlimentos([...alimentos, { ...novoAlimento, id: docRef.id }]);
        setNome('');
        setCalorias('');
        setDescricao('');
        setAlimentoAdicionado(true); // Define como true para exibir a mensagem
        // Define um tempo para limpar a mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setAlimentoAdicionado(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Erro ao adicionar alimento: ', error);
      });
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <Text>Calorias:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={calorias}
        onChangeText={setCalorias}
      />
      <Text>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Adicionar Alimento" onPress={handleAdicionarAlimentoPress} />
      {alimentoAdicionado && (
        <Text style={styles.mensagemSucesso}>Alimento adicionado com sucesso!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
  mensagemSucesso: {
    color: 'green',
    marginTop: 10,
  },
});

export default ListaAlimentosScreen;
