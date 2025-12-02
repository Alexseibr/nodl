import { View, Text, StyleSheet } from 'react-native';

export const ProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Profile</Text>
    <Text style={styles.subtext}>Authenticate via Telegram or phone to sync with web.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#02040a', padding: 16 },
  text: { color: '#6fffe9', fontSize: 22 },
  subtext: { color: '#b6cde0', marginTop: 8 },
});
