import { Router } from "express";
import { MachineController } from "../contoller/MachineController";

const router = Router();

const machineController = new MachineController();

router.get(
    "/machine",
    machineController.getMachine.bind(machineController)
);

router.post(
    "/machine/restock",
    machineController.restock.bind(machineController)
)

router.post(
    "/machine/buy",
    machineController.buy.bind(machineController)
)

router.post(
    "/machine/insert",
    machineController.insert.bind(machineController)
)
router.post(
    "/machine/maintain",
    machineController.maintain.bind(machineController)
)

export default router;