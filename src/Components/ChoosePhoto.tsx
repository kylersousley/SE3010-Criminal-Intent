import { View, Image, StyleSheet } from "react-native";

type Props = {
    image: string | null;
}

export default function ChoosePhoto({ image }: Props) {
    return(
        <View>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.imagePlaceholder]} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  imagePlaceholder: {
    backgroundColor: 'lightgray',
  },
})