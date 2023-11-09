import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import Routes from "./app/routes/routes.js";
const Application = express();

Application.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for API
Application.use(cookieParser()); // Parse cookies associated with application
Application.use(express.json()); // Parse incoming JSON requests
Application.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests with extended option set to true

// Default Base Route
Application.get("/", async (req, res) => {
  // Information about your API
  const apiInfo = {
    name: "Book Store",
    version: "1.0.0",
    description: "API for managing Book Store data.",
    endpoints: {
      users: "/api/v1/users",
      auth: "/api/v1/auth",
      books: "/api/v1/books",
      orders: "/api/v1/orders",
    },
  };

  // Send a JSON response with API information
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "Server is live and ready to use",
    ...apiInfo,
  });
});

Application.use("/api/v1/", Routes);

// Invalid URL Handler
Application.use((req, res) => {
  // Handle requests to undefined routes
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Invalid URL, please try again!",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Please check your URL and try again!",
      },
    ],
  });
});

export default Application;
