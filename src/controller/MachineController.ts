import { Request, Response } from "express";
import { MachineService } from "../service/MachineService";
import {MachineResponse} from "../dto/response/MachineResponse";
import {MachineStatusResponse} from "../dto/response/MachineStatusResponse";
import {ProductBoughtResponse} from "../dto/response/ProductBoughtResponse";

export class MachineController {

    private machineService = new MachineService();

    getMachine(req: Request, res: Response): void {
        const machine : MachineResponse = this.machineService.getMachine();

        res.status(200).json(machine);
    }

    restock(req: Request, res: Response): void {
        this.machineService.restock(req.body);

        res.status(200).json({
            message: "Restock updated successfully .",
        });
    }

    select(req: Request, res: Response): void {
        const selectProduct : ProductBoughtResponse = this.machineService.select(req.body);

        res.status(200).json(selectProduct);
    }

    insert(req: Request, res: Response): void {
        const credit = this.machineService.insert(req.body);

        res.status(200).json({
            message: "Coins inserted successfully",
            credit
        });
    }

    maintain(req: Request, res: Response): void {
        const machineStatus: MachineStatusResponse = this.machineService.maintain();

        res.status(200).json(machineStatus);
    }
}