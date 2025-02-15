// tests/services/auth.service.test.ts

import * as authRepository from "../../src/modules/auth/auth.repository";
import * as authService from "../../src/modules/auth/auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock external modules
jest.mock("../../src/modules/auth/auth.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user and return user without password", async () => {
      const userData = {
        email: "test12333@example.com",
        password: "password123",
        name: "Test User",
      };

      (authRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      // Simulate hashing password
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (authRepository.createUser as jest.Mock).mockResolvedValue({
        user_id: 1,
        email: userData.email,
        name: userData.name,
        password: "hashedPassword",
      });

      const result = await authService.register(userData);
      // Expect password to be omitted from the returned object
      expect(result).toEqual({
        user_id: 1,
        email: userData.email,
        name: userData.name,
      });
    });

    it("should throw an error if user already exists", async () => {
      const userData = {
        email: "test1@example.com",
        password: "password123",
        name: "Test User",
      };
      (authRepository.getUserByEmail as jest.Mock).mockResolvedValue({
        email: "test1@example.com",
      });
      await expect(authService.register(userData)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("login", () => {
    it("should return a token on successful login", async () => {
      const user = {
        user_id: 1,
        email: "test12333@example.com",
        password: "hashedPassword",
      };
      (authRepository.getUserByEmail as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token123");

      const token = await authService.login("test1@example.com", "password123");
      expect(token).toBe("token123");
    });

    it("should throw an error on invalid credentials", async () => {
      (authRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      await expect(
        authService.login("test1@example.com", "password123")
      ).rejects.toThrow("Invalid email or password");
    });
  });
});
