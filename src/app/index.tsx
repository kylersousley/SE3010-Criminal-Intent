import { Text, View, StyleSheet, FlatList } from "react-native";
import { getCrimes } from "@/storage/crimeStorage";
import { useState, useEffect, useContext } from "react";

import Crime from "@/Components/Crime";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Index() {
  // The date is saved with toISOString(), because AsyncStorage only stores text. When you load crimes, turn it back into a date with new Date(crime.date).
  const { themeBackgroundColor } = useContext(ThemeContext)
  const [crimes, setCrimes] = useState()
  getCrimes().then(setCrimes);
  

  return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
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
