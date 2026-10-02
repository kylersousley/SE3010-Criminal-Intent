import { Text, View, Alert, StyleSheet, TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/contexts/ThemeContext";

import * as ImagePicker from 'expo-image-picker';

import IconButton from "@/Components/IconButton";
import ChoosePhoto from "@/Components/ChoosePhoto";
import AppButton from "@/Components/AppButton";
import CustomCheckBox from "@/Components/CustomCheckBox";
import MultiPlatformDatePicker from "@/Components/MultiPlatformDatePicker";
import { saveCrimes, getCrimes, getCrime } from "@/storage/crimeStorage";

export default function NewCrime() {
    const { mainTextColor, themeBackgroundColor } = useContext(ThemeContext)
    const { id } = useLocalSearchParams();
    const crimeID = Array.isArray(id) ? id[0] : id;
   
    const [image, setImage] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [isChecked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
      if (!crimeID) return;
      getCrime(crimeID).then((crime) => {
        setImage(crime.image)
        setTitle(crime.title)
        setDetails(crime.details)
        setDate(new Date(crime.date))
        setChecked(crime.solved)
      })
    }, [crimeID]);

    const handleSave = async () => {
        const crime = {
            id: crimeID || Date.now().toString(),
            title,
            details,
            date: date.toISOString(),
            solved: isChecked,
            image,
        };

        const crimes = await getCrimes();
        const index = crimes.findIndex((c) => c.id === crime.id);
        if (index >= 0) {
          crimes[index] = crime;
        } else {
          crimes.push(crime);
        }
        await saveCrimes(crimes);

        Alert.alert("Crime was successfully saved!")
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
        <View style={styles.container2}>
            <View>
                <ChoosePhoto image={image} />
                <View style={styles.cameraButton}>
                    <IconButton icon="camera" size={36} color="black" onPress={pickImage}/>
                </View>
            </View>
            <View style={styles.titleSection}>
                <Text style={[styles.text, { color: mainTextColor }]}>Title</Text>
                <TextInput style={[styles.input, { color: mainTextColor }]} placeholder="Title" placeholderTextColor="gray" value={title} onChangeText={setTitle} />
            </View>
        </View>
        <View>
            <Text style={[styles.text, { color: mainTextColor }]}>Details</Text>
            <TextInput style={[styles.detailsInput, { color: mainTextColor }]} placeholder="What happened?" placeholderTextColor="gray" multiline submitBehavior="blurAndSubmit" returnKeyType="done" value={details} onChangeText={setDetails} />
        </View>
        <MultiPlatformDatePicker value={date} mode="date" onValueChange={(_event, selectedDate) => setDate(selectedDate)} displayIOS="spinner" titleAndroid={date.toLocaleDateString()} />
        <CustomCheckBox value={isChecked} onValueChange={setChecked} color={mainTextColor} text="Solved" />
        <AppButton title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  cameraButton: {
    width: '100%',
    backgroundColor: 'lightgray',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  titleSection: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    fontSize: 18,
    paddingVertical: 8,
  },
  detailsInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 18,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
});