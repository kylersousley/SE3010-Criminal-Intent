import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import AppButton from "@/Components/AppButton";

export default function ChangeTheme() {
    const { changeTheme, setTheme, mainTextColor, setMainTextColor, setTextIconColor, themeBackgroundColor, setThemeBackgroundColor } = useContext(ThemeContext)

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
            <AppButton title="Purple" onPress={() => changeTheme('purple')} />
            <AppButton title="Blue" onPress={() => changeTheme('blue')} />
            <AppButton title="Red" onPress={() => changeTheme('red')} />
            <AppButton title="White" onPress={() => changeTheme('white')} />
            <AppButton title="Dark" onPress={() => changeTheme('dark')} />
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