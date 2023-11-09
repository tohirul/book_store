import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import responseSender from "../../../shared/responseSender.js";
import BookService from "./book.service.js";
import queryFieldGenerator from "../../../helpers/queryFieldGenerator.js";

const createBook = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await BookService.createBook(payload);

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  const result = await BookService.updateBook(id, payload);

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const allBooks = catchAsync(async (req, res) => {
  const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
  const searchFields = ["title", "author", "genre", "publicationDate"];
  const filterableFields = ["s", "genre", "publicationDate"];

  const paginationOptions = queryFieldGenerator(req.query, paginationFields);
  const filterOptions = queryFieldGenerator(req.query, filterableFields);

  const result = await BookService.allBooks(
    paginationOptions,
    filterOptions,
    searchFields
  );

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All books successfully retrieved.",
    data: result.data,
    meta: result.meta,
  });
});

const findBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookService.findBook(id);

  responseSender(res, {
    statusCode: 200,
    success: true,
    message: "Book data retrieved successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

const BookController = {
  createBook,
  updateBook,
  deleteBook,
  findBook,
  allBooks,
};

export default BookController;
