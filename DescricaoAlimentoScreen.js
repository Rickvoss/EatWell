import React from 'react';
import { View, Text } from 'react-native';

const DescricaoAlimentoScreen = ({ route }) => {
  const { alimento } = route.params;

  return (
    <View>
      <Text>Descrição do Alimento</Text>
      <Text>Nome: {alimento.name}</Text>
      <Text>Calorias: {alimento.caloria}</Text>
      {/* Adicione mais informações do alimento aqui */}
    </View>
  );
};

export default DescricaoAlimentoScreen;