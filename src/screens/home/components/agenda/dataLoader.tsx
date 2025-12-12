import React, { useEffect, useState } from "react";
import db, { AgendaItem } from "../../../../hook/sqlite";
import AgendaList from "./list";
import { useNavigateToView } from "src/hook/custom/router";

export default function AgendaItemLoader() {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const navView = useNavigateToView();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await db.agendaOperations.getAllRows();
        setItems(data);
      } catch (error) {
        console.error("Error fetching agenda items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <AgendaList
      data={items}
      onPressItem={(i) => {
        console.log("Pressed item", i);
        navView(i.id);
      }}
    />
  );
}
