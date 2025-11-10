import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { adminCredentials } from "config/env";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: adminCredentials,
      headers: {
        "content-type": "application/json"
      }
    });

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const headers = loginResponse.headers();
    expect(headers["authorization"]).toBeTruthy();
  });
});
