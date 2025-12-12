import { useEffect, useState } from "react";
import { AgendaItem } from "../../hook/sqlite";
import db from "../../hook/sqlite";
import {
  Text,
  View,
  TextInput,
  Switch,
  StyleSheet,
  Platform,
} from "react-native";
import ThemedButton from "src/components/ThemedButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import colors, { defaultStyles, typography } from "../../theme/colors";
import useFindAgendaItem from "src/hook/custom/findItem";
import { useNavigateToHome } from "src/hook/custom/router";
import PageHeader from "src/components/header";

export default function FormScreen() {
  const agendaItem = useFindAgendaItem()?.agendaItem;
  const navHome = useNavigateToHome();

  const [data, setData] = useState<AgendaItem>(
    db.dbModels.colsAgendaDefaultValues
  );
  const [dateIso, setDateIso] = useState<string>(
    db.dbModels.colsAgendaDefaultValues.end_iso ||
      formatToLocalISO(new Date(), false)
  );
  const [showTime, setShowTime] = useState<boolean>(false);
  const [showDatePickerNative, setShowDatePickerNative] = useState(false);
  const [showTimePickerNative, setShowTimePickerNative] = useState(false);

  useEffect(() => {
    if (agendaItem) {
      setData(agendaItem);
      setDateIso(agendaItem.end_iso);
    }
  }, [agendaItem]);

  function formatToLocalISO(d: Date, includeTime: boolean) {
    const pad = (n: number) => String(n).padStart(2, "0");
    const Y = d.getFullYear();
    const M = pad(d.getMonth() + 1);
    const D = pad(d.getDate());
    if (!includeTime) return `${Y}-${M}-${D}T00:00:00`;
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    return `${Y}-${M}-${D}T${hh}:${mm}:${ss}`;
  }

  async function onSave() {
    const iso = dateIso || formatToLocalISO(new Date(), showTime);
    const item: AgendaItem = {
      ...data,
      end_iso: iso,
    } as AgendaItem;

    try {
      if (agendaItem && agendaItem.id) {
        item.id = agendaItem.id;
        await db.agendaOperations.updateRow(item);
      } else {
        await db.agendaOperations.insertRow(item);
      }
      navHome();
    } catch (e) {
      console.warn("Failed to save agenda item", e);
    }
  }

  return (
    <View style={[defaultStyles.container]}>
      <PageHeader
        text={
          agendaItem
            ? "Editar elemento de la agenda"
            : "Añadir elemento a la agenda"
        }
      />
      <Text style={[styles.label, typography.label]}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={data.title}
        onChangeText={(text: string) => setData({ ...data, title: text })}
      />

      <Text style={[styles.label, typography.label]}>Descripción</Text>
      <TextInput
        style={styles.textarea}
        value={data.description}
        onChangeText={(text: string) => setData({ ...data, description: text })}
      />

      <Text style={[styles.label, typography.label]}>Fecha de finalización</Text>
      <View style={styles.row}>
        <ThemedButton
          title="Seleccionar fecha"
          onPress={() => setShowDatePickerNative(true)}
        />
        <View style={styles.switchWrap}>
          <Text>Incluir hora</Text>
          <Switch value={showTime} onValueChange={setShowTime} />
        </View>
      </View>

      <Text style={[styles.selected, typography.description]}>
        Seleccionado: {formatToLocalISO(new Date(dateIso), showTime)}
      </Text>

      {/* Native DateTimePicker handling. On iOS we can show a single
          datetime picker when `showTime` is true; on Android we show a
          date picker first and then a time picker (sequential). */}
      {Platform.OS !== "web" && (
        <>
          {showDatePickerNative && (
            <DateTimePicker
              value={new Date(dateIso)}
              mode={showTime && Platform.OS === "ios" ? "datetime" : "date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selected) => {
                setShowDatePickerNative(false);
                if (!selected) return; // dismissed
                const pickedDate = selected as Date;
                if (showTime && Platform.OS === "android") {
                  // Save the picked date (no time yet) then show time picker
                  setDateIso(formatToLocalISO(pickedDate, false));
                  setShowTimePickerNative(true);
                } else {
                  setDateIso(formatToLocalISO(pickedDate, showTime));
                }
              }}
            />
          )}

          {showTimePickerNative && (
            <DateTimePicker
              value={new Date(dateIso)}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selected) => {
                setShowTimePickerNative(false);
                if (!selected) return;
                const time = selected as Date;
                const base = new Date(dateIso);
                const newDate = new Date(
                  base.getFullYear(),
                  base.getMonth(),
                  base.getDate(),
                  time.getHours(),
                  time.getMinutes(),
                  time.getSeconds()
                );
                setDateIso(formatToLocalISO(newDate, true));
              }}
            />
          )}
        </>
      )}

      <ThemedButton title="Guardar" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 8, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: colors.indigoBloom,
    padding: 8,
    marginTop: 4,
    maxHeight: 40,
    borderRadius: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.indigoBloom,
    padding: 8,
    marginTop: 4,
    minHeight: 100,
    maxHeight: 250,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  switchWrap: { flexDirection: "row", alignItems: "center" },
  selected: { marginTop: 8, color: "#666" },
});
