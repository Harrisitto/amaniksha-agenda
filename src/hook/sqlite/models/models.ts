import * as SQLiteModule from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';


const dbName = 'agenda.db';
export const db: SQLiteDatabase = SQLiteModule.openDatabaseSync(dbName);



export const TableNameAgenda = 'agenda';

export const colsAgenda = {
    id: 'id',
    title: 'title',
    description: 'description',
    done: 'done',
    end_iso: 'end_iso',
}

export type AgendaItem = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    end_iso: string;
}

export const colsAgendaDefaultValues = {
    id: 0,
    title: '',
    description: '',
    done: false,
    end_iso: '',
}