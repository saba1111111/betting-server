import { Request, Response } from "express";
import * as eventsService from "./events.service";

export async function getAllEvents(req: Request, res: Response) {
  try {
    const { page = "1", pageSize = "10" } = req.query;

    const events = await eventsService.getAllEvents({
      page: parseInt(page as string, 10),
      pageSize: parseInt(pageSize as string, 10),
    });

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const event = await eventsService.getEventById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const { event_name, odds } = req.body;
    const newEvent = await eventsService.createEvent({ event_name, odds });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { event_name, odds } = req.body;
    const updatedEvent = await eventsService.updateEvent(id, {
      event_name,
      odds,
    });
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deleted = await eventsService.deleteEvent(id);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
