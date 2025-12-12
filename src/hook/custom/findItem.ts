import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { AgendaItem } from "../sqlite";
import db from "../sqlite";

export default function useFindAgendaItem() {

    const params = useLocalSearchParams();
    const id = (params?.id as string) || undefined;
    const itemId = id ? Number(id) : 0;

    const [item, setItem] = useState<AgendaItem | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (itemId && itemId !== 0) {
                try {
                    const fetchedItem = await db.agendaOperations.getRow(itemId);
                    setItem(fetchedItem || null);
                } catch (e) {
                    console.warn("Failed to fetch agenda item", e);
                }
            }
        }
        fetchItem();
    }, [itemId]);

    return {
        agendaItem: item,
    };
}