import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

export default function AppButton({title, onPress}: Props) {
    const { theme, textIconColor } = useContext(ThemeContext);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme },
                pressed && styles.pressed
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: textIconColor }]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
        opacity: 1,
        boxShadow: '0px 4px 6px -1px gray'
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
