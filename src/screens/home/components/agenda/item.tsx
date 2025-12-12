import { useMemo } from "react";
import { AgendaItem } from "../../../../hook/sqlite";
import { Pressable, View, Text, StyleSheet } from "react-native";
import colors, { typography } from "../../../../theme/colors";
import { readableDate } from "src/functions/readableDate";

export default function RenderAgendaItem({ item, onPress }: { item: AgendaItem; onPress?: (item: AgendaItem) => void; }) {
  const now = new Date();
  const itemDate = new Date(item.end_iso);

  const isOverDue = itemDate < now && !item.done;

  const isToday =
    itemDate.getDate() === now.getDate() &&
    itemDate.getMonth() === now.getMonth() &&
    itemDate.getFullYear() === now.getFullYear();

  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  const isNextWeek = itemDate > now && itemDate <= nextWeek;

  const dateTime = readableDate(item.end_iso);

  const bgColor = isOverDue
    ? "#ffd7e7ff"
    : isToday
    ? "#ff0000ff"
    : isNextWeek
    ? "#ffff57ff"
    : "#09ff00ff";

  return (
    <Pressable onPress={() => onPress?.(item)}>
      {({ pressed }) => (
        <View
          style={[
            styles.item,
            pressed && styles.pressed,
            { backgroundColor: bgColor },
          ]}
        >
          <Text style={[styles.title, typography.title]}>{item.title}</Text>
          <Text style={[styles.meta, typography.miniature]}>{dateTime}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, backgroundColor: "#fff", borderColor: colors.indigoBloom, borderWidth: 5, borderRadius: 16, marginVertical: 16 },
  pressed: { backgroundColor: "#f0f0f0" },
  title: { fontSize: 16, fontWeight: "500", color: colors.indigoBloom },
  meta: { fontSize: 12, color: colors.indigoBloom },
});
