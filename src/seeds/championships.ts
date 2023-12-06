import { eq } from 'drizzle-orm';
import ky from 'ky';

import {
	championshipTable,
	rulesetTable,
} from '../../runde-tips-www/db/schema';
import { libsqlDb as db } from '../libsql-db';

import { type Championship } from '@haus23/tipprunde-types/dist/index';

export async function seedChampionships() {
	const championships = await ky
		.get('https://backend.runde.tips/api/v1/championships')
		.json<Championship[]>();

	const rulesets = await db.select().from(rulesetTable);

	for await (const cs of championships) {
		const rulesetId = rulesets.find((r) => r.slug === cs.rulesId)?.id;
		if (!rulesetId) {
			throw new Error(`Unknown championship ruleset: ${cs.rulesId}`);
		}

		const previousChampionship = await db.query.championshipTable.findFirst({
			where: eq(championshipTable.slug, cs.id),
		});

		// No need to re-seed existing and completed championships
		if (!previousChampionship || !previousChampionship.completed) {
			console.log(`Seeding ${cs.name}`);

			const results = await db
				.insert(championshipTable)
				.values({
					slug: cs.id,
					name: cs.name,
					nr: cs.nr,
					published: cs.published,
					extraPointsPublished: cs.extraPointsPublished,
					completed: cs.completed,
					rulesetId,
				})
				.onConflictDoUpdate({
					target: championshipTable.slug,
					set: {
						published: cs.published,
						extraPointsPublished: cs.extraPointsPublished,
						completed: cs.completed,
					},
				})
				.returning();
		}
	}
}
