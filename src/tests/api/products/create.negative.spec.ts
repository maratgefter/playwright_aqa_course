import { test } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/types/product.types";
import { ERROR_MESSAGES } from "data/errorMessages";
import { negtiveCasesProductCreate, requiredFieldsCases } from "data/salesPortal/products/createProductCases";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";

  //TODO: add afterhook

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  for (const createCase of negtiveCasesProductCreate) {
    test(`Create Product with "${createCase.description}"`, async ({ productsApi }) => {
      const productData = { ...generateProductData(), ...createCase.testData };
      const createdProduct = await productsApi.create(productData as unknown as IProduct, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY
      });
    });
  }

  for (const requiredFieldsCase of requiredFieldsCases) {
    test(`Create Product with "${requiredFieldsCase.description}"`, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();

      const productData = generateProductData();
      const productDataWithoutField = _.omit(productData, [requiredFieldsCase.omitField]) as unknown as IProduct;

      const createdProduct = await productsApi.create(productDataWithoutField, token);

      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY
      });
    });
  }
});
