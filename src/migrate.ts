import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { libsqlClient } from './libsql-client.js';

const db = drizzle(libsqlClient);
migrate(db, { migrationsFolder: 'migrations' });
