import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

GenreSchema.virtual("url").get(function () {
  return "/catalog/genres/" + this._id;
});

export default model("Genre", GenreSchema);
