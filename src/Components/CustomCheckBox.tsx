import { View, Text, StyleSheet } from "react-native";
import { Checkbox } from 'expo-checkbox';


type Props = {
    value: boolean;
    onValueChange: (value: boolean) => void;
    color: string;
    text: string;
}

export default function CustomCheckBox({ value, onValueChange, color, text }: Props) {
    return(
        <View style={styles.checkBoxContainer}>
            <Checkbox value={value} onValueChange={onValueChange} />
            <Text style={[styles.checkBoxText, { color: color }]}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBoxText: {
    fontSize: 16,
  },
})

