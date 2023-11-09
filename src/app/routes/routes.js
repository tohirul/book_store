import express from "express";
import AuthRouter from "../modules/auth/authRoute.js";
import BookRouter from "../modules/books/book.route.js";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/book",
    route: BookRouter,
  },
];

for (const { path, route } of moduleRoutes) router.use(path, route);

const Routes = router;
export default Routes;
