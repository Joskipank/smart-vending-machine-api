import {MachineStatusEnum} from "../enums/MachineStatusEnum";

export function getMachineStatus(temperature: number): MachineStatusEnum {
    if (temperature <= 80) {
        return MachineStatusEnum.OPERATIONAL;
    }

    if (temperature <= 100) {
        return MachineStatusEnum.OVERHEATED;
    }

    return MachineStatusEnum.BROKEN;
}