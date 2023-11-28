import { createClient } from '@libsql/client';

export const libsqlClient = createClient({
	url: process.env.DATABASE_URL || 'file:../runde-tips-www/data/development.db',
});
