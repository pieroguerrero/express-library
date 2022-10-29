import { Schema, model } from "mongoose";

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  if (!this.first_name || !this.family_name) {
    return "";
  }

  return this.first_name + ", " + this.family_name;
});

AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

export default model("Author", AuthorSchema);
