import ky from 'ky';
import { userTable } from '../../runde-tips-www/db/schema';
import { libsqlDb as db } from '../libsql-db';

import { type Account } from '@haus23/tipprunde-types/dist/index';
type AccountWithRule = Account & { role?: string };

export async function seedUsers() {
	const users = await ky
		.get('https://backend.runde.tips/api/v1/accounts')
		.json<AccountWithRule[]>();

	for await (const user of users) {
		await db
			.insert(userTable)
			.values({
				name: user.name,
				slug: user.id,
				email: user.email ? user.email : undefined,
				roles: JSON.stringify(
					user.role === 'ADMIN' ? ['ADMIN', 'PLAYER'] : ['PLAYER'],
				),
			})
			.onConflictDoUpdate({
				target: userTable.slug,
				set: {
					name: user.name,
					email: user.email ? user.email : undefined,
				},
			});
	}
}
