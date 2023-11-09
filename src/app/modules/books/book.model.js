import mongoose, { Types } from "mongoose";
import bookConstants from "./book.constants.js";

const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: bookConstants.BookGenres,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
