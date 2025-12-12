import { dbModels } from "../models";
import { createAgendaTableQuery } from "./tables";

const db = dbModels.db;

export async function initializeDB(): Promise<void> {
  await db.runAsync(createAgendaTableQuery);
}
