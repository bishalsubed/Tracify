import { connectDB } from "@/lib/db";
import { migrate } from "drizzle-orm/neon-http/migrator";

export async function runMigrations(){
    try {
        await migrate(await connectDB(), {
            migrationsFolder:'./src/db/migrations'
        })
    } catch (error) {
        console.error('Error running migrations:', error);
    }
}