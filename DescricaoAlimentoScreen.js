import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DescricaoAlimentoScreen = ({ route }) => {
  const { alimento } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: alimento.img }} // Substitua por sua URL de imagem
            style={styles.imagemAlimento}
          />
        </View>
      </View>
      <Text style={styles.nomeAlimento}>{alimento.name}</Text>
      <View style={styles.caloriesContainer}>
        <Text>Calorias:</Text>
        <Text style={styles.caloriesText}>{alimento.caloria}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55934F',
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  imageWrapper: {
    width: 250,
    height: 250,
    borderRadius: 175,
    backgroundColor: '#F2FFF0',
    borderWidth: 5,
    borderColor: '#71AD6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagemAlimento: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  nomeAlimento: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: 125,
    height: 40,
  },
  caloriesText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default DescricaoAlimentoScreen;
