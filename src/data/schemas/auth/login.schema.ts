import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { userSchema } from "./user.schema";

export const loginSchema = {
  type: "object",
  properties: {
    User: userSchema,
    ...obligatoryFieldsSchema
  },
  required: ["User", ...obligatoryRequredFields],
  additionalProperties: false
};
