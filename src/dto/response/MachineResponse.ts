import {SlotModel} from "../../model/SlotModel";
import {MachineStatusEnum} from "../../enums/MachineStatusEnum";

export interface MachineResponse {
    temperature: number;
    credit: number;
    revenue: number;
    slots: Array<SlotModel>;
    status: MachineStatusEnum;
}