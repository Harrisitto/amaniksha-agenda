import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import unicorn from "../../assets/unicorn-svg.svg";
import { typography } from "../theme/colors";

export default function PageHeader({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Image
        source={unicorn}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={[styles.title, typography.title]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 16 },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    image: { width: 100, height: 100 },
});
