import { pgTable as table, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import {
    InferSelectModel,
    InferInsertModel,
} from "drizzle-orm";
import { relations } from "drizzle-orm";
import { Users } from "./users";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const routineEnum = pgEnum("routine", ["daily", "weekly", "monthly"]);


export const Tasks = table("tasks", {
    id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: t.integer("userId").notNull().references(() => Users.id, {onDelete:"cascade"}),
    title: t.varchar("title", { length: 255 }).notNull(),
    description: t.text("description"),
    completed: t.boolean("completed").default(false).notNull(),
    priority: priorityEnum("priority").default("low").notNull(),
    dueDate: t.timestamp("dueDate"),
    createdAt: t.timestamp("createdAt").defaultNow().notNull(),
    completedAt: t.timestamp("completedAt"),
    isRoutine: t.boolean("isRoutine").default(false).notNull(),
    routineFrequency: routineEnum("routineFrequency").default("daily"),
    routineTime: t.timestamp("routineTime")
});

export const taskRelations = relations(Tasks, ({one}) => ({
    user: one(Users, {
        fields:[Tasks.userId],
        references:[Users.id]
    })
}))

export type SelectTask = InferSelectModel<typeof Tasks>;
export type InsertTask = InferInsertModel<typeof Tasks>;