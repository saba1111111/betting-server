import * as eventsRepository from "../../src/modules/events/events.repository";
import * as eventsService from "../../src/modules/events/events.service";
import * as cacheService from "../../src/cache/cache.service";
import { IEvent } from "../../src/modules/events/events.interfaces";

jest.mock("../../src/modules/events/events.repository");
jest.mock("../../src/cache/cache.service");
jest.mock("../../src/cache/redisClient", () => ({
  default: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    keys: jest.fn().mockResolvedValue([]),
    on: jest.fn(),
  },
}));

describe("Events Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllEvents", () => {
    it("should return events from cache if available", async () => {
      const cachedEvents: IEvent[] = [
        { event_id: 1, event_name: "Test Event", odds: 1.5 },
      ];
      (cacheService.getCache as jest.Mock).mockResolvedValue(cachedEvents);

      const result = await eventsService.getAllEvents({
        page: 1,
        pageSize: 10,
      });
      expect(result).toEqual(cachedEvents);
      expect(cacheService.getCache).toHaveBeenCalledWith(
        "events:page:1:pageSize:10"
      );
    });

    it("should return events from repository and set cache if not cached", async () => {
      (cacheService.getCache as jest.Mock).mockResolvedValue(null);
      const repoEvents: IEvent[] = [
        { event_id: 1, event_name: "Test Event", odds: 1.5 },
      ];
      (eventsRepository.getAllEventsFromDB as jest.Mock).mockResolvedValue(
        repoEvents
      );
      (cacheService.setCache as jest.Mock).mockResolvedValue(undefined);

      const result = await eventsService.getAllEvents({
        page: 1,
        pageSize: 10,
      });
      expect(result).toEqual(repoEvents);
      expect(cacheService.setCache).toHaveBeenCalledWith(
        "events:page:1:pageSize:10",
        repoEvents,
        60
      );
    });
  });

  describe("getEventById", () => {
    it("should return event from cache if available", async () => {
      const cachedEvent: IEvent = {
        event_id: 1,
        event_name: "Test Event",
        odds: 1.5,
      };
      (cacheService.getCache as jest.Mock).mockResolvedValue(cachedEvent);

      const result = await eventsService.getEventById(1);
      expect(result).toEqual(cachedEvent);
      expect(cacheService.getCache).toHaveBeenCalledWith("event:1");
    });

    it("should return event from repository and set cache if not cached", async () => {
      (cacheService.getCache as jest.Mock).mockResolvedValue(null);
      const repoEvent: IEvent = {
        event_id: 1,
        event_name: "Test Event",
        odds: 1.5,
      };
      (eventsRepository.getEventByIdFromDB as jest.Mock).mockResolvedValue(
        repoEvent
      );
      (cacheService.setCache as jest.Mock).mockResolvedValue(undefined);

      const result = await eventsService.getEventById(1);
      expect(result).toEqual(repoEvent);
      expect(cacheService.setCache).toHaveBeenCalledWith(
        "event:1",
        repoEvent,
        60
      );
    });
  });

  describe("updateEvent", () => {
    it("should update event and invalidate caches", async () => {
      const updatedEvent: IEvent = {
        event_id: 1,
        event_name: "Updated Event",
        odds: 2.0,
      };
      (eventsRepository.updateEventInDB as jest.Mock).mockResolvedValue(
        updatedEvent
      );
      (cacheService.deleteCache as jest.Mock).mockResolvedValue(undefined);
      (cacheService.deleteKeysByPattern as jest.Mock).mockResolvedValue(
        undefined
      );

      const result = await eventsService.updateEvent(1, {
        event_name: "Updated Event",
        odds: 2.0,
      });
      expect(result).toEqual(updatedEvent);
      expect(cacheService.deleteCache).toHaveBeenCalledWith("event:1");
      expect(cacheService.deleteKeysByPattern).toHaveBeenCalledWith(
        "events:page:*"
      );
    });
  });

  describe("deleteEvent", () => {
    it("should delete event and invalidate caches", async () => {
      const deletedEvent: IEvent = {
        event_id: 1,
        event_name: "Test Event",
        odds: 1.5,
      };
      (eventsRepository.deleteEventFromDB as jest.Mock).mockResolvedValue(
        deletedEvent
      );
      (cacheService.deleteCache as jest.Mock).mockResolvedValue(undefined);
      (cacheService.deleteKeysByPattern as jest.Mock).mockResolvedValue(
        undefined
      );

      const result = await eventsService.deleteEvent(1);
      expect(result).toEqual(deletedEvent);
      expect(cacheService.deleteCache).toHaveBeenCalledWith("event:1");
      expect(cacheService.deleteKeysByPattern).toHaveBeenCalledWith(
        "events:page:*"
      );
    });
  });
});
