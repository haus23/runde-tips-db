import { drizzle } from 'drizzle-orm/libsql';

import * as schema from '../runde-tips-www/db/schema.ts';
import { libsqlClient } from './libsql-client.js';

export const libsqlDb = drizzle(libsqlClient, { schema });
