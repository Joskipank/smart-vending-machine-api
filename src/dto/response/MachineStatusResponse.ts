import {MachineStatusEnum} from "../../enums/MachineStatusEnum";

export interface MachineStatusResponse {
    temperature: number;
    status : MachineStatusEnum;
}