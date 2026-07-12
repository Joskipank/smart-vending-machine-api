import {machineStorage} from "../storage/machineStorage";


export function startMachineScheduler() {
    setInterval(() => {
        machineStorage.temperature += 3;

        for(const slot of machineStorage.slots) {
            if (slot.freshness > 0){
                slot.freshness -= 1;
            }
        }
    }, 60000)
}