import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://beauty-api-private.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }), // Certifique-se de que "senha" é o correto
      });

      const data = await response.json();
      console.log(data); // Para verificar a resposta

      if (!response.ok) {
        Alert.alert('Login Falhou', data.message || 'Erro desconhecido.');
      } else {
        // Armazenar o token, ID do usuário e nome do usuário
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userId', data.id.toString()); // Armazena o ID como string
        await AsyncStorage.setItem('userName', data.nome); // Armazena o nome do usuário
        Alert.alert('Bem-vindo(a)', `Olá, ${data.nome}!`);
        router.push('/beuty'); // Redireciona para a tela de tabs
      }
      console.log(data.token);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/logo.png')} />

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="#008584" />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="#008584" />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link href="/cadastro">
          <Text style={styles.registerText}>Ainda não possui uma conta? Cadastre-se</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008584',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#004d4d',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
