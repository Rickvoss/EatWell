import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from './firebase';

const ListaAlimentosScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [alimentos, setAlimentos] = useState([
    { id: 1, name: 'Pão', caloria: 100 },
    { id: 2, name: 'Hamburger', caloria: 200 },
    { id: 3, name: 'Alface', caloria: 300 },
    // Adicione mais alimentos aqui...
  ]);
  const [searchedAlimentos, setSearchedAlimentos] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchText(text);

    // Filtrar a lista de alimentos com base no texto de pesquisa
    const filteredAlimentos = alimentos.filter((alimento) =>
      alimento.name.toLowerCase().includes(text.toLowerCase())
    );

    setSearchedAlimentos(filteredAlimentos);
  };

  const handleAdicionarAlimentoPress = () => {
    navigation.navigate('AdicionarAlimentoScreen');
  };

  const handleAdicionarAlimento = (nomeAlimento, caloriasAlimento) => {
    const newAlimento = {
      id: alimentos.length + 1,
      name: nomeAlimento,
      caloria: caloriasAlimento,
    };
    setAlimentos([...alimentos, newAlimento]);
  };

  const handleItemPress = (alimento) => {
    navigation.navigate('DescricaoAlimentoScreen', { alimento });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar alimentos..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchedAlimentos.length > 0 ? searchedAlimentos : alimentos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
      <Button title="Adicionar Alimento" onPress={handleAdicionarAlimentoPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListaAlimentosScreen;