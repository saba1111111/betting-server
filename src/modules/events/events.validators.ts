import { body, param, query } from "express-validator";

export const createEventValidator = [
  body("event_name")
    .notEmpty()
    .withMessage("Event name is required")
    .isString()
    .withMessage("Event name must be a string"),
  body("odds")
    .notEmpty()
    .withMessage("Odds is required")
    .isNumeric()
    .withMessage("Odds must be a number"),
];

export const updateEventValidator = [
  param("id").isNumeric().withMessage("ID must be a number"),
  body("event_name")
    .optional()
    .isString()
    .withMessage("Event name must be a string"),
  body("odds").optional().isNumeric().withMessage("Odds must be a number"),
];

export const getEventByIdValidator = [
  param("id").isNumeric().withMessage("ID must be a number"),
];

export const paginationValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("pageSize must be a positive integer"),
];
