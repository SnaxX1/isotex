import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();

  let imageUrl = 'https://via.placeholder.com/300';
  if (product.image) {
    if (product.image.startsWith('http')) {
      imageUrl = product.image;
    } else {
      const path = product.image.startsWith('/') ? product.image : `/${product.image}`;
      imageUrl = `${API_URL}${path}`;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.price}>{product.price} TND</Text>
        </View>

        <Text style={styles.category}>{product.category || 'Innovative Eco-Material'}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {product.description || "This sustainable material is crafted from recycled textiles, offering exceptional thermal insulation and acoustic properties for modern architectural applications."}
        </Text>

        <View style={styles.specsContainer}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Eco-Impact:</Text>
            <Text style={styles.specValue}>High</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Durability:</Text>
            <Text style={styles.specValue}>Industrial Grade</Text>
          </View>
        </View>

        {/* --- NEW FIELD TOOLS SECTION --- */}
        <Text style={styles.sectionTitle}>Field Tools</Text>
        <View style={styles.fieldToolsRow}>
          <TouchableOpacity 
            style={styles.fieldButton}
            onPress={() => {
              Alert.alert(
                "Installation Guide",
                "Loading technical PDF...\n\n- Installation temp: +5°C to +35°C\n- Fire resistance: Class B-s1,d0\n- Conductivity: 0.038 W/m.K",
                [{ text: "Close" }]
              );
            }}
          >
            <Text style={styles.fieldButtonText}>📄 PDF Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.fieldButton}
            onPress={() => {
              Alert.alert(
                "Circular Impact",
                `This ${product.title} product has recycled the equivalent of 12kg of used textiles.\n\nCircularity Score: 98%`,
                [{ text: "Awesome!" }]
              );
            }}
          >
            <Text style={styles.fieldButtonText}>♻️ Impact</Text>
          </TouchableOpacity>
        </View>
        {/* ------------------------------ */}

        <TouchableOpacity 
          style={styles.addToCartBtn}
          onPress={() => {
            addToCart(product);
            Alert.alert('Added to Cart', `${product.title} has been added to your cart.`, [
              { text: 'Continue Shopping' },
              { text: 'View Cart', onPress: () => navigation.navigate('Cart') }
            ]);
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3A29',
  },
  category: {
    fontSize: 14,
    color: '#C5A880',
    fontWeight: '600',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  specsContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    fontSize: 14,
    color: '#888',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3A29',
  },
  addToCartBtn: {
    backgroundColor: '#2C3A29',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2C3A29',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldToolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  fieldButton: {
    flex: 1,
    backgroundColor: '#F0F4F0',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C3A29',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fieldButtonText: {
    color: '#2C3A29',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ProductDetailsScreen;
