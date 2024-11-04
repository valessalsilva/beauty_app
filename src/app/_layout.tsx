import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="detalhes/index" options={{ headerShown: false }} />
      <Stack.Screen name="beuty/_layout" options={{ headerShown: false,  title: 'Beuty',}} />
    </Stack>
  );
}
  