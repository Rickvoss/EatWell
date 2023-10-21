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

const AlimentosStack = () => {
 return (
 <Stack.Navigator>
  <Stack.Screen name="Lista de Alimentos" component={ListaAlimentosScreen} />
  <Stack.Screen name="DescricaoAlimentoScreen" component={DescricaoAlimentoScreen} />
  <Stack.Screen name="CriacaoPratosScreen" component={CriacaoPratosScreen}/>
  <Stack.Screen name="AdicionarAlimentoScreen" component={AdicionarAlimentoScreen}/>
 </Stack.Navigator>
 );
};

const App = () => {
 return (
 <NavigationContainer>
  <Tab.Navigator>
   <Tab.Screen name="Alimentos" component={AlimentosStack} />
   <Tab.Screen name="Criação de Pratos" component={CriacaoPratosScreen} />
  </Tab.Navigator>
 </NavigationContainer>
 );
};

export default App;