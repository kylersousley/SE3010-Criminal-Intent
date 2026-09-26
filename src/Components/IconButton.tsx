import { View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    size: number;
    color: string;
};

export default function IconButton({icon, size, color, onPress}: Props) {

    return (
        <View style={styles.iconButtonContainer}>
            <Pressable onPress={onPress}>
                <Ionicons name={icon} size={size} color={color} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    iconButtonContainer: {
        width: 'auto',
        height: 'auto',
    },
});