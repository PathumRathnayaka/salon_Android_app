import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {AppDispatch, RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllServices} from "@/redux/ServiceSlice";

// const FEATURED_STYLISTS = [
//   {
//     id: '1',
//     name: 'Sarah Johnson',
//     specialty: 'Hair Stylist',
//     rating: 4.9,
//     image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
//   },
//   {
//     id: '2',
//     name: 'Michael Chen',
//     specialty: 'Colorist',
//     rating: 4.8,
//     image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80',
//   },
//   {
//     id: '3',
//     name: 'Emma Davis',
//     specialty: 'Makeup Artist',
//     rating: 4.7,
//     image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80',
//   },
// ];


export default function HomeScreen() {
  const services = useSelector((state:RootState)=>state.service);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back!</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.promoContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }}
          style={styles.promoImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.promoOverlay}>
          <Text style={styles.promoTitle}>Summer Special</Text>
          <Text style={styles.promoDescription}>Get 20% off on all services</Text>
          <Link href="/services" asChild>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Book Now</Text>
            </TouchableOpacity>
          </Link>
        </LinearGradient>
      </View>

      <Text style={styles.sectionTitle}>Featured Stylists</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stylistsContainer}>
        {services.map((stylist) => (
          <TouchableOpacity key={stylist.id} style={styles.stylistCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80" }} style={styles.stylistImage} />
            <View style={styles.stylistInfo}>
              <Text style={styles.stylistName}>{stylist.name}</Text>
              <Text style={styles.stylistSpecialty}>{stylist.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{4.9}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.quickActions}>
        <Link href="/services" asChild>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="cut" size={24} color="#FF4785" />
            <Text style={styles.actionText}>Book Service</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/appointments" asChild>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="calendar" size={24} color="#FF4785" />
            <Text style={styles.actionText}>My Appointments</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  promoContainer: {
    margin: 20,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  promoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  promoDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#FF4785',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  stylistsContainer: {
    paddingHorizontal: 15,
  },
  stylistCard: {
    width: 200,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
  stylistImage: {
    width: '100%',
    height: 150,
  },
  stylistInfo: {
    padding: 12,
  },
  stylistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stylistSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop:40,
    marginBottom: 0,
  },
  actionCard: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
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
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});