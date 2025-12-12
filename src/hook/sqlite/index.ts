import * as dbModels from './models';
import * as agendaOperations from './tables/agenda/operations';
import * as initializeDB from './init/initalize';

const db = {
	...initializeDB,
	...dbModels,
	agendaOperations,
}

export default db;
export type { AgendaItem } from './models';
