import db from "../../config/db";
import { IEvent } from "./events.interfaces";

export async function getAllEventsFromDB(
  limit: number,
  offset: number
): Promise<IEvent[]> {
  return await db("sports_events")
    .orderBy("event_id", "asc")
    .limit(limit)
    .offset(offset);
}

export async function getEventByIdFromDB(
  id: number
): Promise<IEvent | undefined> {
  return await db("sports_events").where({ event_id: id }).first();
}

export async function createEventInDB(event: IEvent): Promise<IEvent> {
  const [newEvent] = await db("sports_events").insert(event).returning("*");
  return newEvent;
}

export async function updateEventInDB(
  id: number,
  event: Partial<IEvent>
): Promise<IEvent | undefined> {
  const [updatedEvent] = await db("sports_events")
    .where({ event_id: id })
    .update(event)
    .returning("*");
  return updatedEvent;
}

export async function deleteEventFromDB(
  id: number
): Promise<IEvent | undefined> {
  const [deletedEvent] = await db("sports_events")
    .where({ event_id: id })
    .del()
    .returning("*");
  return deletedEvent;
}
