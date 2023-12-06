import ky from 'ky';

import { rulesetTable } from '../../runde-tips-www/db/schema';
import { libsqlDb as db } from '../libsql-db';

import { type Rule } from '@haus23/tipprunde-types/dist/index';

export async function seedRulesets() {
	const rulesets = await ky
		.get('https://backend.runde.tips/api/v1/rules')
		.json<Rule[]>();

	for await (const ruleset of rulesets) {
		await db
			.insert(rulesetTable)
			.values({
				name: ruleset.name,
				slug: ruleset.id,
				description: ruleset.description,
				extraQuestionRule: ruleset.extraQuestionRuleId,
				roundRule: ruleset.roundRuleId,
				matchRule: ruleset.matchRuleId,
				tipRule: ruleset.tipRuleId,
			})
			.onConflictDoNothing();
	}
}
