import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db } from './firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ListaAlimentosScreen = () => {
  const [alimentosAdicionados, setAlimentosAdicionados] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [numFatias, setNumFatias] = useState(1);
  
  const handleIncreaseFatias = () => {
    if (numFatias < 8) {
      setNumFatias(numFatias + 1);
    }
  };
  const handleDecreaseFatias = () => {
    if (numFatias > 1) {
      setNumFatias(numFatias - 1);
    }
  };
  const calcularCaloriasPorFatia = () => {
    const totalCalorias = alimentosAdicionados.reduce((acc, curr) => acc + parseInt(curr.caloria), 0);
    const caloriasPorFatia = (totalCalorias / 8) * numFatias; // Total de calorias dividido por 8 fatias, multiplicado pelo número de fatias selecionadas
    return caloriasPorFatia.toFixed(2); // Arredonda para duas casas decimais
  };
  const handleExcluirAlimento = (index) => {
    if (alimentosAdicionados[index].name === 'Massa') {
      return;
    }
    const novosAlimentosAdicionados = alimentosAdicionados.filter((_, i) => i !== index);
    setAlimentosAdicionados(novosAlimentosAdicionados);
  };

  useEffect(() => {
    const fetchAlimentos = async () => {
      try {
        const alimentosData = [];
        const snapshot = await db.collection('alimentos').get();
        snapshot.forEach((doc) => {
          alimentosData.push({ id: doc.id, ...doc.data() });
        });
  
        // Ordenar alimentos em ordem alfabética
        alimentosData.sort((a, b) => a.name.localeCompare(b.name));
  
        const alimentosSemMassa = alimentosData.filter((alimento) => alimento.name !== 'Massa');
  
        setAlimentos(alimentosSemMassa);
  
        const massa = alimentosData.find((alimento) => alimento.name === 'Massa');
        if (massa) {
          setAlimentosAdicionados([massa]);
        }
      } catch (error) {
        console.error('Erro ao buscar alimentos: ', error);
      }
    };
  
    fetchAlimentos();
  }, []);
  const renderImagensAlimentos = () => {
    const tamanhoAumentado = 150; // Define o tamanho das imagens 3 vezes maior
    const tamanhoMassa = 170; // Define um tamanho maior para a massa
    const alimentosOrdenados = [
      ...alimentosAdicionados.filter((item) => item.name === 'Massa'),
      ...alimentosAdicionados.filter((item) => item.name === 'Molho de Tomate'),
      ...alimentosAdicionados.filter((item) => item.name === 'Queijo'),
      ...alimentosAdicionados.filter(
        (item) => item.name !== 'Massa' && item.name !== 'Molho de Tomate' && item.name !== 'Queijo'),
    ];
  
    return alimentosOrdenados.map((item, index) => (
      <Image
        key={index}
        style={[
          styles.imagemAlimento,
          {
            zIndex: index,
            position: 'absolute',
            marginLeft: 0,
            width: item.name === 'Massa' ? tamanhoMassa : tamanhoAumentado,
            height: item.name === 'Massa' ? tamanhoMassa : tamanhoAumentado,
            left: 100 - (item.name === 'Massa' ? tamanhoMassa / 2 : tamanhoAumentado / 2), 
            top: 100 - (item.name === 'Massa' ? tamanhoMassa / 2 : tamanhoAumentado / 2), 
          },
        ]}
        source={{ uri: item.img }} 
      />
    ));
  };
  const handleAdicionarAlimento = (alimento) => {
    if (alimento.name === 'Massa') {
      return;
    }

    const alreadyAdded = alimentosAdicionados.some((item) => item.id === alimento.id);

    if (!alreadyAdded) {
      const novosAlimentosAdicionados = [...alimentosAdicionados, alimento];
      setAlimentosAdicionados(novosAlimentosAdicionados);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.pizzaAndFatiasContainer}>
          <View style={styles.circle}>{renderImagensAlimentos()}</View>
          <View style={styles.fatiasContainer}>
          <TouchableOpacity onPress={handleIncreaseFatias} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
            <Text style={styles.numFatias}>{numFatias} Fatia(s)</Text>
          <TouchableOpacity onPress={handleDecreaseFatias} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>  
          </View>
        </View>
        <Text style={styles.caloriasText}>
          Total de Calorias: {alimentosAdicionados.reduce((acc, curr) => acc + parseInt(curr.caloria), 0)} kcal (Pizza 35cm)
        </Text>
        <Text style={styles.caloriasPorFatia}>
          Total de Calorias por Fatia: {calcularCaloriasPorFatia()} kcal
        </Text>
      </View>

      <View style={styles.section2}>
        <Text style={styles.adicionadosTitulo}>Adicionados:</Text>
        <FlatList
          data={alimentosAdicionados}
          horizontal
          contentContainerStyle={styles.alimentosAdicionadosScroll}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.alimentoAdicionado} key={index}>
              <View style={styles.alimentoItem_adcs}>
                <View style={styles.alimentoItem_adc}>
                  <Image
                    style={styles.imagemAlimento}
                    source={{ uri: item.img }}
                  />
                </View>
                <TouchableOpacity onPress={() => handleExcluirAlimento(index)} style={styles.excluirIcon}>
                  {item.name !== 'Massa' &&   <MaterialCommunityIcons name="trash-can" size={30} color="grey" />}
                  {item.name === 'Massa' && <Text style={{ color: 'transparent' }}>Placeholder</Text>}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.section3}>
        <Text style={styles.alimentosTitulo}>Alimentos</Text>
        <FlatList
          data={alimentos}
          horizontal
          contentContainerStyle={styles.alimentosScroll}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.alimentoItem} onPress={() => handleAdicionarAlimento(item)}>
              <View style={styles.itemContent}>
                <View style={styles.textContainer}>
                  <Image
                    style={styles.imagemAlimento}
                    source={{ uri: item.img }} // Use o campo correto da imagem no Firestore
                  />
                  <Text style={styles.nomeAlimento}>{item.name}</Text>
                </View>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
  },

  // SEÇÃO 1
  section1: {
    flex: 2.5,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55934F',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#55934F',
  },
  caloriasText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -15,
    marginBottom: -10,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  pizzaAndFatiasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '80%',
    height: 220,
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 25,
    backgroundColor: '#F2FFF0',
  },
  fatiasContainer: {
    flexDirection: 'Column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#55934F',
    padding: 10,
    borderRadius: 5,
    width: 35,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  numFatias: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#55934F',
  },
  caloriasPorFatia: {
    fontSize: 16,
    marginTop: 10,
    color: '#FFFFFF',
  },

  // SEÇÃO 2
  section2: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    color: '#55934F',
    backgroundColor: '#FFFFFF',
  },
  adicionadosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
  alimentoItem_adc: {
    padding: 10,
    height: 80,
    width: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#55934F',
    backgroundColor: '#F2FFF0',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  alimentosAdicionadosScroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alimentoAdicionado: {
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 25,
    marginBottom: 15, 
    marginHorizontal: -15,
  },
  excluirIcon: {
    position: 'absolute',
    bottom: -35,
    alignSelf: 'center',
  },

  // SEÇÃO 3
  section3: {
    flex: 3,
    marginTop: -25,
    marginBottom: -150,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55934F',
    borderRadius: 35,
  },
  alimentoItem: {
    width: 100, // Defina o tamanho fixo para os quadrados
    height: 130, // Defina o tamanho fixo para os quadrados
    margin: 10,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#55934F',
    backgroundColor: '#F2FFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alimentosScroll: {
    justifyContent: 'center',
    borderRadius: 10, 
  },
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Ajuste conforme necessário para espaçamento entre a imagem e o texto
  },
  imagemAlimento: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
  },
  textContainer: {
    justifyContent: 'center', // Alinhar o texto ao centro
    alignItems: 'center',
    color: '#55934F',
  },
  nomeAlimento: {
    marginTop: 10,
    color: '#55934F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alimentosTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  alimentosScroll: {
    justifyContent: 'center',
  },
});

export default ListaAlimentosScreen;