import express from "express";
import ValidateRequest from "../../middlewares/ValidateRequest.js";
import BookZodValidation from "./book.validation.js";
import BookController from "./book.controller.js";

const BookRouter = express.Router();

BookRouter.get("/", BookController.allBooks);
BookRouter.get("/:id", BookController.findBook);

BookRouter.post(
  "/create-book",
  ValidateRequest(BookZodValidation.CreateBookZodSchema),
  BookController.createBook
);
BookRouter.patch("/:id", BookController.updateBook);
BookRouter.delete("/:id", BookController.deleteBook);

export default BookRouter;
