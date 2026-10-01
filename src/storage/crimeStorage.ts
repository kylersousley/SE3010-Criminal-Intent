import AsyncStorage from "@react-native-async-storage/async-storage";

const CRIMES_KEY = "crimes";

export async function getCrimes() {
  const json = await AsyncStorage.getItem(CRIMES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function getCrime(id: string) {
  const crimes = await getCrimes();
  return crimes.find((crime) => crime.id === id) ?? null;
}

export async function saveCrimes(crimes: unknown[]) {
  await AsyncStorage.setItem(CRIMES_KEY, JSON.stringify(crimes));
}
