export interface Machinemaster {
    machineId: number;
    machineName: string;
    machineSerialNumber: string;
    machineManufacturerId: number;
    machineModel: string;
    yearofManufacture: number;
    machineType: number;
    locationId: number;
}

export enum MachineType {
    CNC_Turning_Center = 1,
    VMC = 2,
    HMC = 3,
    HBM = 4,
    VTL = 5,
    Five_Axis_Machining_Center = 6
}
