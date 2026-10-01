import { Text, View, StyleSheet, FlatList } from "react-native";
import { getCrimes } from "@/storage/crimeStorage";
import { useState, useEffect } from "react";

import Crime from "@/Components/Crime";

export default function Index() {
  // The date is saved with toISOString(), because AsyncStorage only stores text. When you load crimes, turn it back into a date with new Date(crime.date).
  const [crimes, setCrimes] = useState()
  getCrimes().then(setCrimes);


  return (
    <View style={styles.container}>
      <FlatList 
        data={crimes}
        keyExtractor={(crime) => crime.id}
        renderItem={({ item }) => (
          <Crime id={item.id} title={item.title} date={item.date} isSolved={item.solved} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
