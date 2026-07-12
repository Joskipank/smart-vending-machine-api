import {Machine} from "../model/MachineModel";
import {MachineStatusEnum} from "../enums/MachineStatusEnum";

export const machineStorage : Machine = {
    temperature : 10,
    credit : 0,
    revenue: 0,
    slots: [],

}