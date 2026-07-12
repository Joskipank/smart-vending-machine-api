import express from "express";
import machineRoutes from "./routes/MachineRouter";
import {startMachineScheduler} from "./scheduler/MachineScheduler";
import {errorHandler} from "./middleware/errorHandler";

const app = express();

startMachineScheduler();

app.use(express.json());

app.use(machineRoutes);

app.use(errorHandler);

export default app;