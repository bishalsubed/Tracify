import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import {
    InferSelectModel,
    InferInsertModel,
} from "drizzle-orm";
import { relations } from "drizzle-orm";
import { Tasks } from "./tasks";

export const Users = table("users", {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar("name", { length: 255 }).notNull(),
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    password: t.varchar("password", { length: 255 }).notNull(),
    avatar: t.text("avatar").default(""),
    updatedAt: t.timestamp("updatedAt").notNull(),
    createdAt: t.timestamp("createdAt").defaultNow().notNull(),
});

export const userRelations = relations(Users, ({ many }) => ({
    tasks: many(Tasks)
}))

export type SelectUser = InferSelectModel<typeof Users>;
export type InsertUser = InferInsertModel<typeof Users>;