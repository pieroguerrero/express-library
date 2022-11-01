import { Schema, model } from "mongoose";
import format from "date-fns/format/index.js";
//import enUS from "date-fns/esm/locale/en-US/index.js";

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  //return format(this.due_back, "MMM Do, yyyy", { locale: enUS });
  return format(this.due_back, "MMM do, yyyy");
});

export default model("BookInstance", BookInstanceSchema);
