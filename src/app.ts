import express from "express";
import machineRoutes from "./routes/MachineRouter";

const app = express();

app.use(express.json());

app.use(machineRoutes);

export default app;