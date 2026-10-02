import { Text, View, Alert, Image, Button, StyleSheet, TextInput, Platform } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Checkbox } from 'expo-checkbox';
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ThemeContext } from "@/contexts/ThemeContext";

import * as ImagePicker from 'expo-image-picker';

import IconButton from "@/Components/IconButton";
import AppButton from "@/Components/AppButton";
import { saveCrimes, getCrimes, getCrime } from "@/storage/crimeStorage";

export default function ChangeTheme() {
    const { theme, setTheme, mainTextColor, setMainTextColor, textIconColor, setTextIconColor, themeBackgroundColor, setThemeBackgroundColor } = useContext(ThemeContext)

    const themePurple = () => {
        setTheme('#6A1B9A')
        setMainTextColor('black')
        setTextIconColor('white')
        setThemeBackgroundColor('#F2F2F2')
    }
    
    const themeBlue = () => {
        setTheme('darkblue')
        setMainTextColor('black')
        setTextIconColor('white')
        setThemeBackgroundColor('#F2F2F2')
    }

    const themeRed = () => {
        setTheme('darkred')
        setMainTextColor('black')
        setTextIconColor('white')
        setThemeBackgroundColor('#F2F2F2')
    }

    const themeWhite = () => {
        setTheme('white')
        setMainTextColor('black')
        setTextIconColor('black')
        setThemeBackgroundColor('#F2F2F2')
    }

    const themeDark = () => {
        setTheme('#181818')
        setMainTextColor('white')
        setTextIconColor('white')
        setThemeBackgroundColor('#121212')
    }

    return(
        <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
            <Text style={[styles.text, { color: mainTextColor }]}>Pick a theme!</Text>
            <AppButton title="Purple" onPress={themePurple} />
            <AppButton title="Blue" onPress={themeBlue} />
            <AppButton title="Red" onPress={themeRed} />
            <AppButton title="White" onPress={themeWhite} />
            <AppButton title="Dark" onPress={themeDark} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        gap: 20
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})