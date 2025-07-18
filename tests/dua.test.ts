import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("Dua Routes", () => {
    it("should return all duas", async () => {
        const response = await request(app).get("/api/duas");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should return a dua by id", async () => {
        const response = await request(app).get("/api/duas/1");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should return duas by category id", async () => {   
        const response = await request(app).get("/api/duas/category/1");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("should return duas by subcategory id", async () => {
        const response = await request(app).get("/api/duas/subcategory/1");
        expect(response.status).toBe(200);  
        expect(response.body).toBeDefined();
    });

    it("should return 404 if dua is not found", async () => {
        const response = await request(app).get("/api/duas/999");
        expect(response.status).toBe(404);
    });

    it("should return 404 if category is not found", async () => {
        const response = await request(app).get("/api/duas/category/999");
        expect(response.status).toBe(404);
    });

    it("should return 404 if subcategory is not found", async () => {   
        const response = await request(app).get("/api/duas/subcategory/999");
        expect(response.status).toBe(404);
    });
});

