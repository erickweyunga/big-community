import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Link href="/" style={styles.link}>
        <Text style={{ fontSize: 20 }}>Go to home screen</Text>
        </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
