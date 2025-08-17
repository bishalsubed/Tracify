import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema/schema';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function connectDB(){
  if(dbInstance) return dbInstance;
  try {
    const sql = neon(process.env.DATABASE_URL!)
    dbInstance = drizzle(sql, {schema})
    
    return dbInstance;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}