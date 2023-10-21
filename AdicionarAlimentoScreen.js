import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ListaAlimentosScreen = () => {
  const [alimentos, setAlimentos] = useState([]);

  const AdicionarAlimentoScreen = () => {
    const [nome, setNome] = useState('');
    const [calorias, setCalorias] = useState('');

    const handleAdicionarAlimentoPress = () => {
      const novoAlimento = {
        nome: nome,
        calorias: parseInt(calorias),
      };
      setAlimentos([...alimentos, novoAlimento]);
      setNome(''); // Limpa o campo de nome após adicionar o alimento
      setCalorias(''); // Limpa o campo de calorias após adicionar o alimento
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
        <Button title="Adicionar Alimento" onPress={handleAdicionarAlimentoPress} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Alimentos</Text>
      <AdicionarAlimentoScreen />
      <Text style={styles.subtitle}>Alimentos adicionados:</Text>
      {alimentos.map((alimento, index) => (
        <Text key={index} style={styles.alimento}>
          {alimento.nome} - {alimento.calorias} calorias
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  alimento: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
});

export default ListaAlimentosScreen;