import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Delete existing entries (optional)
  await knex("sports_events").del();

  // Insert sample data
  await knex("sports_events").insert([
    { event_name: "Soccer: Team A vs. Team B", odds: 1.75 },
    { event_name: "Basketball: Team C vs. Team D", odds: 2.05 },
    { event_name: "Tennis: Player 1 vs. Player 2", odds: 1.9 },
    { event_name: "Baseball: Team E vs. Team F", odds: 2.25 },
    { event_name: "Hockey: Team G vs. Team H", odds: 1.65 },
  ]);
}
