import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { adsApi } from '../api/apiClient';

export const HomeScreen = ({ navigation }: any) => {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    adsApi.searchAds({}).then((data) => setAds(data.items || data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Ads</Text>
      <FlatList
        data={ads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ad', { id: item._id })}>
            <Text style={styles.cardTitle}>{item.title?.ru || item.title}</Text>
            <Text style={styles.cardText}>{item.description?.ru || item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#02040a', padding: 16 },
  title: { color: '#6fffe9', fontSize: 22, marginBottom: 12 },
  card: { backgroundColor: '#0b1221', padding: 12, borderRadius: 10, marginBottom: 10 },
  cardTitle: { color: '#e0f7ff', fontWeight: '700', marginBottom: 4 },
  cardText: { color: '#b6cde0' },
});
