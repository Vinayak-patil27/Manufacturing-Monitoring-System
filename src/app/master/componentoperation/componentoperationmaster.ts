export interface Componentoperationmaster {
  id?: number;
  trNo?: number; // Backend might use TrNo
  componentId: number;
  machineId: number;
  operationCode: string;
  operationName: string;
  operationDescription?: string;
  operationType: number;
}

export enum OperationType {
  Turning = 1,
  Milling = 2,
  Drilling = 3,
  Chamfering = 4,
  Tapping = 5,
  Threading = 6,
  Boring = 7,
  Knurling = 8,
  Honing = 9,
  Buffing = 10
}