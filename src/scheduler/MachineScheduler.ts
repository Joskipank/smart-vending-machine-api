import {machineStorage} from "../storage/machineStorage";
import {getMachineStatus} from "../utils/getMachineStatus";
import {MachineStatusEnum} from "../enums/MachineStatusEnum";

const TICK_INTERVAL = 60000; // 1 минута
const TEMP_STEP = 3;

export function startMachineScheduler() {
    setInterval(() => {
        if (getMachineStatus(machineStorage.temperature) === MachineStatusEnum.BROKEN) {
            return;
        }
        machineStorage.temperature += TEMP_STEP;


        for(const slot of machineStorage.slots) {
            if (slot.freshness > 0){
                slot.freshness -= 1;
            }
        }
    }, TICK_INTERVAL)
}