import type { Config } from "drizzle-kit";

export default {
	schema: 'runde-tips-www/db/schema.ts',
	driver: 'libsql',
	dbCredentials: {
		url: process.env.DATABASE_URL || 'file:../runde-tips-www/data/development.db',
	}
} satisfies Config;
