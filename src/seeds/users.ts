import ky from 'ky';
import { userTable } from '../../runde-tips-www/db/schema';
import { libsqlDb } from '../libsql-db';

export async function seedUsers() {
	const users = await ky
		.get('https://backend.runde.tips/api/v1/accounts')
		.json<Record<string, string>[]>();

	for await (const user of users) {
		await libsqlDb
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
