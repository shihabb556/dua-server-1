import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("Category Routes", () => {
    it("should return all categories", async () => {
        const response = await request(app).get("/api/categories");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should return a category by id", async () => {
        const response = await request(app).get("/api/categories/1");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should return subcategories by category id", async () => {
        const response = await request(app).get("/api/categories/1/subcategories");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});