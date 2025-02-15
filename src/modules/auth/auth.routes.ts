import { Router } from "express";
import * as authController from "./auth.controller";
import { registerValidator, loginValidator } from "./auth.validators";
import { validate } from "../../middleware/validate";

const router = Router();

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);

export default router;
