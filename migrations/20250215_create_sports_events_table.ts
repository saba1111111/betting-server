import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sports_events", (table) => {
    table.increments("event_id").primary();
    table.string("event_name").notNullable();
    table.decimal("odds").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("sports_events");
}
