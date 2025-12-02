import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { adsApi } from '../api/apiClient';

export const CreateAdScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async () => {
    await adsApi.createAd({ title: { ru: title }, description: { ru: description }, categoryId: 'general', price: { amount: 0, currency: 'EUR' }, location: { lat: 0, lng: 0 } });
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Ad</Text>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Publish" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#02040a' },
  title: { color: '#6fffe9', fontSize: 20, marginBottom: 12 },
  input: { backgroundColor: '#0b1221', color: '#e0f7ff', padding: 10, borderRadius: 8, marginBottom: 10 },
});
