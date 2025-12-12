import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors, { defaultStyles } from '../../../../theme/colors';
import { useNavigateToForm } from "src/hook/custom/router";

export default function AddAgendaItemButton({
    itemId,
    ...props
}: PressableProps & { itemId?: number }) {
    const navForm = useNavigateToForm();

    // Allow overriding style via props.style, but provide a nice default FAB style
    // use defaultStyles.fabPosition so the FAB sits bottom-right by default
    const combinedStyle: ViewStyle | any = [defaultStyles.fabPosition, styles.fab, (props.style as ViewStyle)];

    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                combinedStyle,
                pressed && styles.fabPressed,
            ]}
            android_ripple={{ color: "rgba(255,255,255,0.2)", radius: 28 }}
            onPress={() => {
                navForm(itemId ?? 0);
            }}
            accessibilityRole="button"
            accessibilityLabel="Add agenda item"
        >
            <Ionicons name={itemId === undefined ? 'add' : 'create'} size={28} color={colors.blushPop} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.indigoBloom,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    fabPressed: {
        transform: [{ scale: 0.96 }],
        backgroundColor: colors.brilliantRose
    },
    plus: {
        color: colors.white,
        fontSize: 30,
        lineHeight: 30,
        fontWeight: '600',
    }
});