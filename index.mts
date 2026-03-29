import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.mjs";
import adminRoutes from "./routes/admin.mjs";
import feeRoutes from "./routes/fee.mjs";
import customerRoutes from "./routes/customer.mjs";
import type { Error } from "mongoose";
const app = express();
const PORT = parseInt(process.env.PORT || "2500", 10);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Bike Parking Management Server!");
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).json({ success: false, message: err.message || "Server Error" });
});
app.use("/api/admin", adminRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/customers", customerRoutes);

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(chalk.blue("Server is running on http://localhost:" + PORT));
    });
}

export default app;
