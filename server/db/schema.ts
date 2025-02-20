import { relations } from "drizzle-orm";
import { index, int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const list = sqliteTable(
  "list",
  {
    id: text("id").primaryKey(),
    clerkId: text("clerkId").notNull(),
    name: text("name").notNull(),
  },
  (table) => [index("list_clerkId_idx").on(table.clerkId)]
);

export const listItem = sqliteTable("list_item", {
  id: text("id").primaryKey(),
  listId: integer("listId")
    .notNull()
    .references(() => list.id),
  name: text("name").notNull(),
  completed: int({ mode: "boolean" }).default(false).notNull(),
});

export const listRelations = relations(list, ({ one, many }) => ({
  items: many(listItem),
}));

export const listItemRelations = relations(listItem, ({ one }) => ({
  list: one(list, {
    fields: [listItem.listId],
    references: [list.id],
  }),
}));
