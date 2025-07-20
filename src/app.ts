import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware";
import duaCategoryRoutes from "./routes/dua-categories.routes";
import duaRoutes from "./routes/dua.routes";

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
 
// // Routes
app.use('/api/v1/dua-categories', duaCategoryRoutes);
app.use('/api/v1/duas', duaRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app; 