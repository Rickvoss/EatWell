import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaAlimentosScreen from './ListaAlimentosScreen';
import DescricaoAlimentoScreen from './DescricaoAlimentoScreen';
import CriacaoPratosScreen from './CriacaoPratosScreen';
import AdicionarAlimentoScreen from './AdicionarAlimentoScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lista de Alimentos" component={ListaAlimentosScreen} />
        <Tab.Screen name="Criação de Pratos" component={CriacaoPratosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;