import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the School API");
});
// Import routes
import schoolRoutes from "./Routes/schoolRoutes.js";

// Use routes
app.use("/api/school", schoolRoutes);

export default app;
