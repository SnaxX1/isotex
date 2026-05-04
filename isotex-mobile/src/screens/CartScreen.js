import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useCart } from '../context/CartContext';
import api, { API_URL } from '../services/api';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      const response = await api.post('/api/orders', {
        total: cartTotal.toFixed(2),
        items: cartItems,
        paymentMethod: 'cod',
        shippingAddress: { street: 'Mobile Order', postcode: '00000', city: 'Mobile' }
      });
      
      if (response.data.success) {
        clearCart();
        Alert.alert(
          'Order Confirmed!', 
          `Your order (TX-${response.data.id}) has been placed successfully. A confirmation email has been sent.`,
          [{ text: 'OK', onPress: () => navigation.navigate('Shop') }]
        );
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Checkout Failed', 'There was a problem processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    let imageUrl = 'https://via.placeholder.com/100';
    if (item.image) {
      if (item.image.startsWith('http')) {
        imageUrl = item.image;
      } else {
        const path = item.image.startsWith('/') ? item.image : `/${item.image}`;
        imageUrl = `${API_URL}${path}`;
      }
    }

    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: imageUrl }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.price} TND x {item.quantity}</Text>
        </View>
        <TouchableOpacity 
          style={styles.removeBtn}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{cartTotal.toFixed(2)} TND</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.checkoutText}>Checkout Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
    marginTop: 40,
  },
  list: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  removeBtn: {
    padding: 8,
  },
  removeText: {
    color: '#CCC',
    fontSize: 18,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 20,
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    color: '#666',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  checkoutBtn: {
    backgroundColor: '#2C3A29',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: '#C5A880',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  shopBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});

export default CartScreen;
