import { seedChampionships } from './seeds/championships';
import { seedRulesets } from './seeds/rulesets';
import { seedUsers } from './seeds/users';

async function seed() {
	await seedUsers();
	await seedRulesets();
	await seedChampionships();
}

seed()
	.then(() => console.log('Successfully seeded database'))
	.catch((err) => console.log(`Error while seeding database: ${err}`));
