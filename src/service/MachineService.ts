import {MachineStatusEnum} from "../enums/MachineStatusEnum";
import {MachineResponse} from "../dto/responce/MachineResponse";
import {machineStorage} from "../storage/machineStorage";
import {getMachineStatus} from "../utils/getMachineStatus";
import {RestockRequest} from "../dto/request/RestockRequest";
import {SlotModel} from "../model/SlotModel";
import {BuyRequest} from "../dto/request/BuyRequest";
import {InsertRequest} from "../dto/request/InsertRequest";
import {MachineStatusResponse} from "../dto/responce/MachineStatusResponse";

export class MachineService {
    private validateMachineState() : void {
        const status = getMachineStatus(machineStorage.temperature);

        if (status === MachineStatusEnum.BROKEN) {
            throw new Error("Machine is broken. ")
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
            throw new Error("Invalid Argument ");
        }

        machineStorage.credit += request.amount;
        return machineStorage.credit;
    }

    buy(request: BuyRequest) : void {
        const slot = machineStorage.slots.find(
            slot => slot.id === request.id
        );

        if (slot == undefined) {
            throw new Error("Slot not found.");
        }

        if (slot.stock <= 0) {
            throw new Error("Product is out of stock. ");
        }

        if(slot.freshness <= 0) {
            throw new Error("Product is spoiled. ");
        }

        if (machineStorage.credit < slot.price) {
            throw new Error("Not enough credit. ");
        }

        machineStorage.credit -= slot.price;
        machineStorage.revenue += slot.price;
        --slot.stock;
    }

    restock(request: RestockRequest): void {
        if (request.stock < 0) {
            throw new Error("Stock cannot be negative");
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
        if (machineStorage.temperature > 100) {
            throw new Error("machine is broken ");
        }

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