import { Text, View, Alert, Image, Button, StyleSheet, TextInput, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Checkbox } from 'expo-checkbox';
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import * as ImagePicker from 'expo-image-picker';

import IconButton from "@/Components/IconButton";
import AppButton from "@/Components/AppButton";
import { saveCrimes, getCrimes, getCrime } from "@/storage/crimeStorage";

export default function NewCrime() {
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

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            mode: "date",
            maximumDate: new Date(),
            onValueChange: (event, selectedDate) => setDate(selectedDate),
        });
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

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the camera is required.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    return (
    <View style={styles.container}>
        <View style={styles.container2}>
            <View>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder]} />
                )}
                <View style={styles.cameraButton}>
                    <IconButton icon="camera" size={36} color="black" onPress={pickImage}/>
                </View>
            </View>
            <View style={styles.titleSection}>
                <Text style={styles.text}>Title</Text>
                <TextInput style={styles.input} placeholder="Title" placeholderTextColor="gray" value={title} onChangeText={setTitle} />
            </View>
        </View>

        <View>
            <Text style={styles.text}>Details</Text>
            <TextInput style={styles.detailsInput} placeholder="What happened?" placeholderTextColor="gray" multiline submitBehavior="blurAndSubmit" returnKeyType="done" value={details} onChangeText={setDetails} />
        </View>
        <View style={styles.dateContainer}>
            {Platform.OS === "ios" ? (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    themeVariant="light"
                    textColor="black"
                    style={styles.datePicker}
                    maximumDate={new Date()}
                    onValueChange={(event, selectedDate) => setDate(selectedDate)}
                />
            ) : (
                <Button title={date.toLocaleDateString()} onPress={showDatePicker} />
            )}
        </View>
        <View style={styles.checkBoxContainer}>
            <Checkbox value={isChecked} onValueChange={setChecked} />
            <Text style={styles.checkBoxText}>Solved</Text>
        </View>
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
  image: {
    width: 150,
    height: 150,
  },
  imagePlaceholder: {
    backgroundColor: 'lightgray',
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBoxText: {
    fontSize: 16,
  },
  dateContainer: {
    alignItems: 'center'
  },
  datePicker: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
});