# @haus23/runde-tips-db

## Workflow

1. Update submodule: `git submodule update --remote`
2. Update db from schema: `pnpm push`
3. Develop seed etc
4. Test seed: `pnpm push`
5. Generate migrations: `pnpm generate`
6. Release
