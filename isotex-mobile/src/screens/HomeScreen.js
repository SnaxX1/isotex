import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.title}>ISOTEX</Text>
        <Text style={styles.subtitle}>Innovative Eco-Materials for Modern Architecture.</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.buttonText}>Explore Products</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutBtn]}
            onPress={logout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why ISOTEX?</Text>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>Sustainable</Text>
          <Text style={styles.featureDesc}>100% recycled textile materials sourced locally.</Text>
        </View>
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>High Performance</Text>
          <Text style={styles.featureDesc}>Exceptional thermal and acoustic insulation.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', 
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    backgroundColor: '#2C3A29', 
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#F4EFE6',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1CFC7',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#C5A880', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  logoutBtn: {
    backgroundColor: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  featuresSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3A29',
    marginBottom: 4,
  },
  featureDesc: {
    color: '#666666',
    fontSize: 14,
  },
});

export default HomeScreen;
