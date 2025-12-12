import { dbModels } from "../../models";
import { AgendaItem } from "../../models/models";

const db = dbModels.db;

const colsAgenda = dbModels.colsAgenda;
const defaultValues = dbModels.colsAgendaDefaultValues;
const insertRowInAgenda = `INSERT INTO ${dbModels.TableNameAgenda} (
    ${colsAgenda.title}, 
    ${colsAgenda.description}, 
    ${colsAgenda.done}, 
    ${colsAgenda.end_iso}
) VALUES (?, ?, ?, ?);`;

const updateRowInAgenda = `UPDATE ${dbModels.TableNameAgenda} SET
    ${colsAgenda.title} = ?,
    ${colsAgenda.description} = ?,
    ${colsAgenda.done} = ?,
    ${colsAgenda.end_iso} = ?
WHERE ${colsAgenda.id} = ?;`;

const deleteRowInAgenda = `DELETE FROM ${dbModels.TableNameAgenda} WHERE ${colsAgenda.id} = ?;`;

// Order ascending by ISO datetime
const getAllRowsFromAgenda = `SELECT * FROM ${dbModels.TableNameAgenda} ORDER BY ${colsAgenda.end_iso} ASC;`;

const getRowById = `SELECT * FROM ${dbModels.TableNameAgenda} WHERE ${colsAgenda.id} = ?;`;


export const insertRow = async (data: AgendaItem) => {
    return new Promise<number>((resolve, reject) => {
        db
            .runAsync(insertRowInAgenda, [
                data.title || defaultValues.title,
                data.description || defaultValues.description,
                data.done || defaultValues.done,
                data.end_iso || defaultValues.end_iso,
            ])
            .then((result) => {
                resolve(result.lastInsertRowId);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
export const updateRow = async (data: AgendaItem) => {
    return new Promise<void>((resolve, reject) => {
        db.runAsync(updateRowInAgenda, [
            data.title || defaultValues.title,
            data.description || defaultValues.description,
            data.done || defaultValues.done,
            data.end_iso || defaultValues.end_iso,
            data.id,
        ])
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}
export const deleteRow = async (id: number) => {
    return new Promise<void>((resolve, reject) => {
        db.runAsync(deleteRowInAgenda, [id])
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}
export const getAllRows = async (): Promise<AgendaItem[]> => {
    return new Promise<AgendaItem[]>((resolve, reject) => {
        db.getAllAsync(getAllRowsFromAgenda, [])
            .then((rows: unknown[]) => {
                const items = (rows as AgendaItem[]) || [];
                resolve(items);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export const getRow = async (id: number): Promise<AgendaItem | null> => {
    return new Promise<AgendaItem | null>((resolve, reject) => {
        db.getFirstAsync(getRowById, [id])
            .then((row: unknown) => {
                const item = (row as AgendaItem) || null;
                resolve(item);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}
