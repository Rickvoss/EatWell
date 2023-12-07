import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import ListaAlimentosScreen from './ListaAlimentosScreen';
import DescricaoAlimentoScreen from './DescricaoAlimentoScreen';
import CriacaoPratosScreen from './CriacaoPratosScreen';
import AdicionarAlimentoScreen from './AdicionarAlimentoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EatWellHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.header}>
    <Text style={styles.headerText}>EatWell</Text>
    </View>
  </View>
);

const AlimentosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStatusBarHeight: 0, headerShown: false,  }}>
      <Stack.Screen name="ListaAlimentosScreen" component={ListaAlimentosScreen} />
      <Stack.Screen name="DescricaoAlimentoScreen" component={DescricaoAlimentoScreen} />
      <Stack.Screen name="AdicionarAlimentoScreen" component={AdicionarAlimentoScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <EatWellHeader />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Alimentos') {
              iconName = 'menu';
            } else if (route.name === 'Criação de Pizza') {
              iconName = 'pizza';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#13640A',
          tabBarInactiveTintColor: '#71AD6B',
          tabBarLabelStyle: { color: '#71AD6B' },
        })}
      >
        <Tab.Screen name="Alimentos" component={AlimentosStack} options={{ headerShown: false }} />
        <Tab.Screen name="Criação de Pizza" component={CriacaoPratosScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  background: {
    height: '100%', // Ajuste a altura para preencher completamente a tela
    backgroundColor: '#55934F',
  },
  header: {
    height: 80, // Reduzindo a altura do cabeçalho
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55934F',
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
  },
  headerContainer: {
    backgroundColor: '#55934F',
    height: 80,
  },
  headerText: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#55934F',
  },
});

export default App;