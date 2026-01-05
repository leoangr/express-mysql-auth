import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "http://localhost:5173"
   ],
   allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true
}));

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server run at http://localhost:${PORT}`)
});