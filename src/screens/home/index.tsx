import { View, Text, StyleSheet } from "react-native";
import AgendaItemLoader from "./components/agenda/dataLoader";
import AddAgendaItemButton from "./components/add/addButton";
import colors, { defaultStyles } from "src/theme/colors";
import PageHeader from "src/components/header";

export default function HomeScreen() {
  return (
    <View style={defaultStyles.container}>
      <PageHeader text="Tu Agenda Mágica" />
      <AgendaItemLoader />

      <Text style={styles.footerText}>
        Hecha con amor por tu novio el friki
      </Text>
      <AddAgendaItemButton style={defaultStyles.fabPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  fabPosition: { position: "absolute", right: 20, bottom: 30 },
  footerText: { textAlign: "left", color: colors.bubblegumFizz, marginTop: 16 },
});
