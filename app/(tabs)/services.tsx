import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SERVICES = [
  {
    id: '1',
    category: 'Hair',
    services: [
      { id: 'h1', name: 'Haircut & Style', price: 60, duration: '60 min' },
      { id: 'h2', name: 'Color & Highlights', price: 120, duration: '120 min' },
      { id: 'h3', name: 'Blowout', price: 45, duration: '45 min' },
      { id: 'h4', name: 'Hair Treatment', price: 80, duration: '60 min' },
    ],
  },
  {
    id: '2',
    category: 'Nails',
    services: [
      { id: 'n1', name: 'Manicure', price: 35, duration: '30 min' },
      { id: 'n2', name: 'Pedicure', price: 45, duration: '45 min' },
      { id: 'n3', name: 'Gel Polish', price: 50, duration: '45 min' },
    ],
  },
  {
    id: '3',
    category: 'Facial',
    services: [
      { id: 'f1', name: 'Classic Facial', price: 85, duration: '60 min' },
      { id: 'f2', name: 'Deep Cleansing', price: 95, duration: '75 min' },
      { id: 'f3', name: 'Anti-Aging', price: 110, duration: '90 min' },
    ],
  },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Hair');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Services</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {SERVICES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.category)}>
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.category && styles.categoryButtonTextActive,
              ]}>
              {category.category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {SERVICES.find((cat) => cat.category === selectedCategory)?.services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.serviceDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{service.duration}</Text>
                </View>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#FF4785',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF4785',
  },
  bookButton: {
    backgroundColor: '#FF4785',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});