import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { adsApi } from '../api/apiClient';

export const AdDetailsScreen = ({ route }: any) => {
  const { id } = route.params || {};
  const [ad, setAd] = useState<any>();

  useEffect(() => {
    if (id) adsApi.getAd(id).then(setAd);
  }, [id]);

  if (!ad) return <Text style={styles.text}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ad.title?.ru || ad.title}</Text>
      <Text style={styles.text}>{ad.description?.ru || ad.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#02040a', padding: 16 },
  title: { color: '#6fffe9', fontSize: 20, marginBottom: 8 },
  text: { color: '#e0f7ff' },
});
