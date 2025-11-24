import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/auth/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";

test.describe(
  "[API] [Sales Portal] [Login]",
  {
    tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API]
  },
  () => {
    test("Login", async ({ loginApi }) => {
      const loginResponse = await loginApi.login(credentials);

      validateResponse(loginResponse, {
        status: STATUS_CODES.OK,
        schema: loginSchema,
        IsSuccess: true,
        ErrorMessage: null
      });

      const headers = loginResponse.headers;
      expect(headers["authorization"]).toBeTruthy();
    });
  }
);
