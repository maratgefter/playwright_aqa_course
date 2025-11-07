import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { faker } from "@faker-js/faker";

test.describe("[API] [Sales Portal] [Products]", () => {
  const positiveCasesProductCreate = [
    {
      description: "name with min valid length",
      testData: { name: faker.string.alphanumeric({ length: 3 }) }
    },
    {
      description: "name with max valid length",
      testData: { name: faker.string.alphanumeric({ length: 40 }) }
    },
    {
      description: "name with only one space",
      testData: { name: `${faker.string.alphanumeric({ length: 8 })} ${faker.string.alphanumeric({ length: 6 })}` }
    },
    {
      description: "min valid price",
      testData: { price: 1 }
    },
    {
      description: "max valid price",
      testData: { price: 99999 }
    },
    {
      description: "min valid amount",
      testData: { amount: 0 }
    },
    {
      description: "max valid amount",
      testData: { amount: 999 }
    },
    {
      description: "empty notes",
      testData: { notes: "" }
    },
    {
      description: "max valid notes length",
      testData: { notes: faker.string.alphanumeric({ length: 250 }) }
    }
  ];

  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const createCase of positiveCasesProductCreate) {
    test(`Create Product with "${createCase.description}"`, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();
      const productData = { ...generateProductData(), ...createCase.testData };
      const createdProduct = await productsApi.create(productData, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    });
  }
});
