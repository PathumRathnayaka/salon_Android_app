import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const APPOINTMENTS = [
  {
    id: '1',
    service: 'Haircut & Style',
    stylist: 'Sarah Johnson',
    date: new Date(2025, 2, 15, 14, 30),
    status: 'upcoming',
  },
  {
    id: '2',
    service: 'Manicure',
    stylist: 'Emma Davis',
    date: new Date(2025, 2, 18, 10, 0),
    status: 'upcoming',
  },
  {
    id: '3',
    service: 'Color & Highlights',
    stylist: 'Michael Chen',
    date: new Date(2025, 2, 10, 11, 0),
    status: 'completed',
  },
];

export default function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.appointmentsContainer} showsVerticalScrollIndicator={false}>
        {APPOINTMENTS.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.serviceName}>{appointment.service}</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      appointment.status === 'upcoming' ? '#E3F2FD' : '#E8F5E9',
                  },
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        appointment.status === 'upcoming' ? '#1976D2' : '#2E7D32',
                    },
                  ]}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{appointment.stylist}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {format(appointment.date, 'MMM d, yyyy')}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {format(appointment.date, 'h:mm a')}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentActions}>
              {appointment.status === 'upcoming' && (
                <>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}>
                    <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {appointment.status === 'completed' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Book Again</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    padding: 8,
  },
  appointmentsContainer: {
    paddingHorizontal: 20,
  },
  appointmentCard: {
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#FF4785',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF4785',
  },
  cancelButtonText: {
    color: '#FF4785',
  },
});