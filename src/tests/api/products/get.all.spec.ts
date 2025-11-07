import { test, expect } from "fixtures/api.fixture";
import { getAllProductsSchema } from "data/schemas/products/get.all.products.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Get All Products", async ({ loginApiService, productsApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();

    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    const getAllProductsResponse = await productsApi.getAll(token);
    validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const product = getAllProductsResponse.body.Products.find((prod: { _id: string }) => prod._id === id);
    expect(product).toEqual(createdProduct);
  });
});
