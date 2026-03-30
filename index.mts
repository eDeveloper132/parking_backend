import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.mjs";
import adminRoutes from "./routes/admin.mjs";
import feeRoutes from "./routes/fee.mjs";
import customerRoutes from "./routes/customer.mjs";
import { notFound, errorHandler } from "./middlewares/error-middleware.mjs";

const app = express();
const PORT = parseInt(process.env.PORT || "2500", 10);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Bike Parking Management Server!" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/customers", customerRoutes);

app.use(notFound);
app.use(errorHandler);

process.on("uncaughtException", (err) => {
    console.error(chalk.red("Uncaught Exception:"), err);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.red("Unhandled Rejection at:"), promise, "reason:", reason);
    process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(chalk.blue("Server is running on http://localhost:" + PORT));
    });
}

export default app;
