import { z } from "zod";
import bookConstants from "./book.constants.js";

const reviewSchema = z.object({
  userName: z.string(),
  userId: z.string(),
  review: z.string(),
  star: z.number().int().min(1).max(5),
});

const CreateBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title of the book is required",
    }),
    author: z.string({
      required_error: "Author of the book is required",
    }),
    genre: z.enum([...bookConstants.BookGenres], {
      required_error: "Genre is required",
    }),
    publicationDate: z.string({
      required_error: "Publication data is required",
    }),
    createdBy: z.string({
      required_error: "Created by is required",
    }),
    reviews: z.array(reviewSchema).optional(),
  }),
});

const BookZodValidation = {
  CreateBookZodSchema,
};

export default BookZodValidation;
