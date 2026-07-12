import { Router } from "express";
import { MachineController } from "../controller/MachineController";
import {validateInsert} from "../validation/insertValidator";
import {restockValidator} from "../validation/restockValidator";
import {selectValidator} from "../validation/selectValidator";

const router = Router();

const machineController = new MachineController();

router.get(
    "/machine",
    machineController.getMachine.bind(machineController)
);

router.post(
    "/machine/restock",
    restockValidator,
    machineController.restock.bind(machineController)
)

router.post(
    "/machine/select",
    selectValidator,
    machineController.select.bind(machineController)
)

router.post(
    "/machine/insert",
    validateInsert,
    machineController.insert.bind(machineController)
)
router.post(
    "/machine/maintain",
    machineController.maintain.bind(machineController)
)

export default router;