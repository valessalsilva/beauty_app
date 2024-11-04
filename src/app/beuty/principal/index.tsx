import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, ScrollView, FlatList, Animated, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const services = [
  { id: '1', name: 'Corte de Cabelo' },
  { id: '2', name: 'Manicure' },
  { id: '3', name: 'Penteado' },
  { id: '4', name: 'Maquiagem' },
  { id: '5', name: 'Limpeza de Pele' },
];

const beautyTips = [
  { id: '1', tip: 'Mantenha a pele hidratada todos os dias.' },
  { id: '2', tip: 'Use protetor solar mesmo em dias nublados.' },
  { id: '3', tip: 'Beba bastante água para manter a pele saudável.' },
  { id: '4', tip: 'Evite dormir de maquiagem.' },
  { id: '5', tip: 'Experimente novos estilos, não tenha medo de mudar!' },
];

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true); // Adiciona estado de carregamento

  const animateTips = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateTips();
    // Simula um carregamento de dados
    const loadTips = async () => {
      try {
        // Simula um tempo de carregamento (ex: fetch de dados)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false); // Define loading como false após o "carregamento"
      } catch (error) {
        console.error('Erro ao carregar dicas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as dicas de beleza.');
      }
    };

    loadTips();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image style={styles.image} source={require('@/assets/images/logo.png')} />
        
        {/* Seção de Serviços Populares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços Populares</Text>
          <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.card}>
                <MaterialIcons name="star" size={24} color="#008584" />
                <Text style={styles.item}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Link para Agendar Horário */}
        <Link href="./pesquisa" style={styles.link}>
          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Agendar um Horário</Text>
            </View>
          </Pressable>
        </Link>

        {/* Seção de Dicas de Beleza */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas de Beleza</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <FlatList
              data={beautyTips}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animated.View style={[styles.card, { 
                  opacity: fadeAnim, 
                  transform: [{ translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] 
                }]}>
                  <AntDesign name="heart" size={24} color="#008584" />
                  <Text style={styles.item}>{item.tip}</Text>
                </Animated.View>
              )}
              contentContainerStyle={styles.tipsList}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008584',
    padding: 16,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  item: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  link: {
    width: '100%',
  },
  button: {
    backgroundColor: '#006666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipsList: {
    paddingBottom: 20,
  },
});
