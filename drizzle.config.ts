import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './src/db/drizzle',
    schema: [
        './src/db/schema/users.ts',
        './src/db/schema/tasks.ts',
    ],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: '__drizzle_migrations',
        schema: 'public',
    },
    verbose: true,
    strict: true
});
