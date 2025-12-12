import { dbModels } from "../models";


const colsAgenda = dbModels.colsAgenda;
export const createAgendaTableQuery = `
CREATE TABLE IF NOT EXISTS ${dbModels.TableNameAgenda} (
  ${colsAgenda.id} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${colsAgenda.title} TEXT NOT NULL,
    ${colsAgenda.description} TEXT,
    ${colsAgenda.done} BOOLEAN NOT NULL DEFAULT FALSE,
    ${colsAgenda.end_iso} TEXT
);
-- Create an index on end_iso for faster lookups and ordering
CREATE INDEX IF NOT EXISTS idx_${dbModels.TableNameAgenda}_end_iso 
  ON ${dbModels.TableNameAgenda} (${colsAgenda.end_iso});
`;
