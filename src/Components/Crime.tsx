import { Text, View, Alert, Image, Button, StyleSheet, TextInput, Platform, Pressable } from "react-native";
import { useContext, useState } from "react";
import { Checkbox } from 'expo-checkbox';
import { router } from "expo-router";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


import * as ImagePicker from 'expo-image-picker';

import IconButton from "@/Components/IconButton";
import AppButton from "@/Components/AppButton";
import { saveCrimes, getCrimes } from "@/storage/crimeStorage";
import { ThemeContext } from "@/contexts/ThemeContext";

type Props = {
    id: string;
    title: string;
    date: string;
    isSolved: boolean;
};

export default function({ id, title, date, isSolved }: Props) {
    const { mainTextColor } = useContext(ThemeContext)
    const test = () => {
        console.log("test")
    }

    const sendData = () => {
        router.push({
        pathname: '/new-crime',
        params: { id: id }
    });
    }

    return(
        <Pressable onPress={sendData}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: mainTextColor }]}>{title}</Text>
                    <Text style={[styles.date, { color: mainTextColor }]}>{date}</Text>
                </View>
                <View style={styles.icon}>
                    {isSolved && <MaterialCommunityIcons name="handcuffs" size={48} color={mainTextColor} />}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        padding: 10,
        gap: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 20,
    },
    icon: {
        padding: 10
    }
})