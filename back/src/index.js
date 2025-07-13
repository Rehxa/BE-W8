import express from "express";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import userRoutes from "./routes/user.routes.js";
import { serveSwagger, setupSwagger } from "./config/swagger.js";
import cors from "cors";
import { authenticateToken } from "./middlewares/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/docs", serveSwagger, setupSwagger);

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/teachers", teacherRoutes);
app.use("/auth", userRoutes);
app.get("/", (req, res) => res.send("Welcome to School API!"));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/docs`)
);
