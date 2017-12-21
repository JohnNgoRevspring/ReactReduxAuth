import { schema } from "normalizr";

export const noteSchema = new schema.Entity(
  "notes",
  {},
  { idAttribute: "_id" }
);
