import mongoose from "mongoose";
import Book from "./book.model.js";
import calculatePagination from "../../../helpers/calculatePagination.js";

const createBook = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let book;

  try {
    const newBook = await Book.create([payload], { session });

    if (!newBook.length)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to create the profile"
      );
    book = newBook[0];
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
  return await Book.findById({ _id: book._id }).populate({
    path: "createdBy",
    select: "-password -address -phoneNumber -role -createdAt -updatedAt",
  });
};

const updateBook = async (id, payload) => {
  const exists = await Book.exists({ _id: id });

  if (exists === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");

  return await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate({
    path: "createdBy",
    select: "-password -address -phoneNumber -role -createdAt -updatedAt",
  });
};

const findBook = async (id) => {
  const exists = await Book.exists({ _id: id });
  if (exists === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");

  return await Book.findById({ _id: id }).populate({
    path: "createdBy",
    select: "-password -address -phoneNumber -role -createdAt -updatedAt",
  });
};

const allBooks = async (paginationOptions, filterOptions, searchFields) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { s: searchTerm, ...filtersData } = filterOptions;
  console.log("SeachInput: ", searchTerm);
  const sortConditions = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const conditions = [];
  if (searchTerm)
    conditions.push({
      $or: searchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  console.log("Conditions", conditions);
  if (Object.keys(filtersData).length)
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  const searchConditions = conditions.length > 0 ? { $and: conditions } : {};

  const result = await Book.find(searchConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate({
      path: "createdBy",
      select: "-password -address -phoneNumber -role -createdAt -updatedAt",
    });

  const total = await Book.countDocuments(searchConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteBook = async (id) => {
  const exists = await Book.exists({ _id: id });

  if (exists === null)
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  let book;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedBook = await Book.findOneAndDelete(
      { _id: id },
      { session: session }
    ).populate({
      path: "createdBy",
      select: "-password -address -phoneNumber -role -createdAt -updatedAt",
    });

    if (!deletedBook)
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete profile");
    book = deletedBook;
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
  return book;
};

const BookService = {
  createBook,
  deleteBook,
  updateBook,
  findBook,
  allBooks,
};

export default BookService;
