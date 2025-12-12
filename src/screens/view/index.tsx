import { Text, View, StyleSheet } from "react-native";
import PageHeader from "src/components/header";
import { readableDate } from "src/functions/readableDate";
import useFindAgendaItem from "src/hook/custom/findItem";
import colors, { defaultStyles, typography } from "src/theme/colors";
import ThemedButton from "src/components/ThemedButton";
import { useNavigateToHome } from "src/hook/custom/router";
import db from "src/hook/sqlite";
import AddAgendaItemButton from "../home/components/add/addButton";

export default function ViewAgendaItemScreen() {
  const item = useFindAgendaItem()?.agendaItem;

  const navHome = useNavigateToHome();

  async function onDelete() {
    if (!item || item.id === 0) return;

    try {
      await db.agendaOperations.deleteRow(item.id);
      navHome();
    } catch (e) {
      console.warn("Failed to delete agenda item", e);
    }
  }

  if (!item) {
    return <Text>ELEMENTO NO ENCONTRADO</Text>;
  }
  return (
    <View style={defaultStyles.container}>
      <PageHeader text="Ver elemento de la agenda" />
      <Text style={typography.label}>{item.title}</Text>
      <Text style={typography.label}>
        {readableDate(item.end_iso)}
      </Text>
      <Text style={typography.description}>{item.description}</Text>
      <ThemedButton title="Eliminar" color={"red"} onPress={onDelete} />
      <AddAgendaItemButton itemId={item.id} style={defaultStyles.fabPosition} />
    </View>
  );
}
