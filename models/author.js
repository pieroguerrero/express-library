import { Schema, model } from "mongoose";
import format from "date-fns/format/index.js";

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
  return "/catalog/authors/" + this._id;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  //return format(this.due_back, "MMM Do, yyyy", { locale: enUS });
  if (!this.date_of_birth) {
    return null;
  }

  return format(this.date_of_birth, "MMM do, yyyy");
});
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  //return format(this.due_back, "MMM Do, yyyy", { locale: enUS });
  if (!this.date_of_death) {
    return null;
  }

  return format(this.date_of_death, "MMM do, yyyy");
});

export default model("Author", AuthorSchema);
