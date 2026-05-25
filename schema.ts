import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  insuranceType: text("insuranceType").notNull(),
  profile: text("profile").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  createdAt: text("createdAt").notNull(),
});