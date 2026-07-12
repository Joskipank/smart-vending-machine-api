import {MachineStatusEnum} from "../enums/MachineStatusEnum";
import {MachineResponse} from "../dto/response/MachineResponse";
import {machineStorage} from "../storage/machineStorage";
import {getMachineStatus} from "../utils/getMachineStatus";
import {RestockRequest} from "../dto/request/RestockRequest";
import {SlotModel} from "../model/SlotModel";
import {SelectRequest} from "../dto/request/SelectRequest";
import {InsertRequest} from "../dto/request/InsertRequest";
import {MachineStatusResponse} from "../dto/response/MachineStatusResponse";
import {AppError} from "../exception/AppError";
import {ProductBoughtResponse} from "../dto/response/ProductBoughtResponse";

export class MachineService {
    private validateMachineState() : void {
        const status = getMachineStatus(machineStorage.temperature);

        if (status === MachineStatusEnum.BROKEN) {
            throw new AppError(
                "Machine is broken",
                409
            );
        }
    }

    getMachine() : MachineResponse {
        return {
            temperature: machineStorage.temperature,
            credit: machineStorage.credit,
            revenue: machineStorage.revenue,
            slots: machineStorage.slots,
            status: getMachineStatus(machineStorage.temperature)
        }
    }

    insert(request: InsertRequest): number {
        this.validateMachineState();

        if (request.amount <= 0) {
            throw new AppError("Bad request.",
                400
            );
        }

        machineStorage.credit += request.amount;
        return machineStorage.credit;
    }

    select(request: SelectRequest) : ProductBoughtResponse {
        this.validateMachineState();

        const slot = machineStorage.slots.find(
            slot => slot.id === request.id
        );

        if (slot == undefined) {
            throw new AppError(
                "Slot not found",
                404
            );
        }

        if (slot.stock <= 0) {
            throw new AppError(
                "Product is out of stock",
                409
            );
        }

        if(slot.freshness <= 0) {
            throw new AppError(
                "Product is spoiled",
                409
            );
        }

        if (machineStorage.credit < slot.price) {

            throw new AppError(
                "Not enough credit",
                409
                );
        }

        machineStorage.credit -= slot.price;
        machineStorage.revenue += slot.price;
        --slot.stock;

        return {
            product: slot.product,
            price: slot.price,
            credit: machineStorage.credit
        }
    }

    restock(request: RestockRequest): void {
        this.validateMachineState();

        if (request.stock < 0) {
            throw new AppError("Bad Request",
                400
            );
        }

        const slot: SlotModel = {
            id: request.id,
            product: request.product,
            price: request.price,
            stock: request.stock,
            freshness: 100
        }

        for(let i = 0; i < machineStorage.slots.length; i++) {
            if (machineStorage.slots[i].id === request.id) {
                machineStorage.slots[i] = slot;
                return;
            }
        }

        machineStorage.slots.push(slot);
    }

    maintain() : MachineStatusResponse {
        this.validateMachineState();

        machineStorage.temperature -= 30;

        if (machineStorage.temperature < 0) {
            machineStorage.temperature = 0;
        }

        return {
            temperature : machineStorage.temperature,
            status : getMachineStatus(machineStorage.temperature)
        }
    }
}