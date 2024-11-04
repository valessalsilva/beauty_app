import { Stack, Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='principal/index'  // Home
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name='home' color={'#008584'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='pesquisa/index'
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name='search' color={'#008584'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='favoritos/index'
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name='heart' color={'#008584'} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name='perfil/index'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name='user' color={'#008584'} size={size} />
          ),
        }}
      />

    </Tabs>

  );
}
