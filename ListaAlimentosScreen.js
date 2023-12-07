import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebase';


  const ListaAlimentosScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [alimentos, setAlimentos] = useState([]);
  const [searchedAlimentos, setSearchedAlimentos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        const alimentosData = [];
        if (db) {
          const snapshot = await db.collection('alimentos').get();
          snapshot.forEach((doc) => {
            alimentosData.push({ id: doc.id, ...doc.data() });
          });
          setAlimentos(alimentosData);
        }
      } catch (error) {
        console.error('Erro ao buscar alimentos: ', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchAlimentos();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredAlimentos = alimentos.filter((alimento) =>
      alimento.name.toLowerCase().includes(text.toLowerCase())
    );

    setSearchedAlimentos(filteredAlimentos);
  };

  const handleAdicionarAlimentoPress = () => {
    navigation.navigate('AdicionarAlimentoScreen');
  };

  const handleItemPress = (alimento) => {
    navigation.navigate('DescricaoAlimentoScreen', { alimento });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
    <View style={styles.itemContent}>
      <View style={styles.imagemContainer}>
        <Image
          style={styles.imagemAlimento}
          source={{ uri: item.img }}
        />
      </View>
      <Text style={[styles.nomeAlimento, { textAlign: 'center' }]}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={{ flex: 1, backgroundColor: '#55934F' }}>
      <View style={styles.container}>
      <Text style={styles.title}>Alimentos</Text>
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
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: 55,
    borderRadius: 50, 
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 55,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#55934F',
  },
  searchInput: {
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#55934F',
    borderRadius: 25,},
  item: {
    flex: 1,
    margin: 10,
    padding: 10,
    width: 100, // Largura fixa para garantir o mesmo tamanho
    height: 115, // Altura fixa para garantir o mesmo tamanho
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#55934F',
    backgroundColor: '#F2FFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E2E2E',
  },
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Ajuste conforme necessário para espaçamento entre a imagem e o texto
  },
  imagemAlimento: {
    width: 50, // Defina o tamanho da imagem conforme necessário
    height: 50, // Defina o tamanho da imagem conforme necessário
    borderRadius: 25, // Para deixar a imagem redonda, se preferir
  },
  textContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#55934F',
  },
  nomeAlimento: {
    marginTop: 10,
    color: '#55934F',
    fontWeight: 'bold',
  },  
  flatlistContent: {
    paddingBottom: 80, // Adapte conforme necessário para acomodar o botão
  },
});

export default ListaAlimentosScreen;
