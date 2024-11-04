import { Stack, Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

      <Tabs.Screen
        name='index'
        options={{
          title: 'Salão',
          tabBarIcon: ({ focused, size }) => (
            <FontAwesome name='star' color={'#008584'} size={size} />
          ),
        }}
      />
    </Tabs>

  );
}
