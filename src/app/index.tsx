import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  // The date is saved with toISOString(), because AsyncStorage only stores text. When you load crimes, turn it back into a date with new Date(crime.date).
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
