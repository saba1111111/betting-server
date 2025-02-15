import { IEvent, IPagination } from "./events.interfaces";
import * as eventsRepository from "./events.repository";
import {
  getCache,
  setCache,
  deleteCache,
  deleteKeysByPattern,
} from "../../cache/cache.service";

export async function getAllEvents(pagination: IPagination): Promise<IEvent[]> {
  try {
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 10;
    const offset = (page - 1) * pageSize;
    const cacheKey = `events:page:${page}:pageSize:${pageSize}`;

    const cachedEvents = await getCache<IEvent[]>(cacheKey);
    if (cachedEvents) {
      return cachedEvents;
    }

    const events = await eventsRepository.getAllEventsFromDB(pageSize, offset);
    await setCache(cacheKey, events, 60);

    return events;
  } catch (error) {
    console.error("Error in events service (getAllEvents):", error);
    throw error;
  }
}

export async function getEventById(id: number): Promise<IEvent | undefined> {
  try {
    const cacheKey = `event:${id}`;

    const cachedEvent = await getCache<IEvent>(cacheKey);
    if (cachedEvent) {
      console.log("Returning event from cache");
      return cachedEvent;
    }

    const event = await eventsRepository.getEventByIdFromDB(id);
    if (event) {
      await setCache(cacheKey, event, 60);
    }
    return event;
  } catch (error) {
    console.error("Error in events service (getEventById):", error);
    throw error;
  }
}

export async function createEvent(event: IEvent): Promise<IEvent> {
  try {
    return await eventsRepository.createEventInDB(event);
  } catch (error) {
    console.error("Error in events service (createEvent):", error);
    throw error;
  }
}

export async function updateEvent(
  id: number,
  event: Partial<IEvent>
): Promise<IEvent | undefined> {
  try {
    const updatedEvent = await eventsRepository.updateEventInDB(id, event);

    await deleteCache(`event:${id}`);
    await deleteKeysByPattern(`events:page:*`);

    return updatedEvent;
  } catch (error) {
    console.error("Error in events service (updateEvent):", error);
    throw error;
  }
}

export async function deleteEvent(id: number): Promise<IEvent | undefined> {
  try {
    const deletedEvent = await eventsRepository.deleteEventFromDB(id);

    await deleteCache(`event:${id}`);
    await deleteKeysByPattern(`events:page:*`);

    return deletedEvent;
  } catch (error) {
    console.error("Error in events service (deleteEvent):", error);
    throw error;
  }
}
