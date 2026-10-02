import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "@/contexts/ThemeContext";

type Props = {
    id: string;
    title: string;
    date: string;
    isSolved: boolean;
};

export default function({ id, title, date, isSolved }: Props) {
    const { mainTextColor } = useContext(ThemeContext)

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