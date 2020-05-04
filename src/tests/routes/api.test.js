import request from "supertest";
import app from "../../index";

describe("Test API Health", () => {
  it("Check API Health", () => {
    request(app)
      .get("/")
      .then((response) => {
        const mockResponse = {
          status: "API is working",
          message: "Welcome to MVC model",
        };
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponse);
      });
  });
});
