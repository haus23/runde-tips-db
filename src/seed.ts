import { seedUsers } from './seeds/users';

async function seed() {
	await seedUsers();
}

seed()
	.then(() => console.log('Successfully seeded database'))
	.catch((err) => console.log(`Error while seeding database: ${err}`));
