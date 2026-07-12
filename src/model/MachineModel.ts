import {SlotModel} from "./SlotModel";
import {MachineStatusEnum} from "../enums/MachineStatusEnum";

export interface Machine {
    temperature: number; // Старт 20°C | +3°C/мин | -30°C при сервисе | >100°C = поломка
    credit: number;
    revenue: number; //  Общая выручка (то, что автомат уже заработал)
    slots: Array<SlotModel>;

}