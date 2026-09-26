import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

export default function AppButton({title, onPress}: Props) {

    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6A1B9A',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
