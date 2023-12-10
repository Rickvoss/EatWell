import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const DescricaoAlimentoScreen = ({ route }) => {
  const { alimento } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left-bold-circle-outline" size={35} color="white" />
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    width: 55,
    height: 55,
    backgroundColor: '#2B7023',
    borderRadius: 55,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DescricaoAlimentoScreen;
