import express from "express";
import machineRoutes from "./routes/MachineRouter";
import {startMachineScheduler} from "./scheduler/MachineScheduler";

const app = express();

startMachineScheduler();

app.use(express.json());

app.use(machineRoutes);

export default app;