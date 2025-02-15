import { Router } from "express";
import * as eventsController from "./events.controller";
import {
  createEventValidator,
  updateEventValidator,
  getEventByIdValidator,
  paginationValidator,
} from "./events.validators";
import { validate } from "../../middleware/validate";

const router = Router();

router.get("/", paginationValidator, validate, eventsController.getAllEvents);
router.get(
  "/:id",
  getEventByIdValidator,
  validate,
  eventsController.getEventById
);
router.post("/", createEventValidator, validate, eventsController.createEvent);
router.put(
  "/:id",
  updateEventValidator,
  validate,
  eventsController.updateEvent
);
router.delete(
  "/:id",
  getEventByIdValidator,
  validate,
  eventsController.deleteEvent
);

export default router;
