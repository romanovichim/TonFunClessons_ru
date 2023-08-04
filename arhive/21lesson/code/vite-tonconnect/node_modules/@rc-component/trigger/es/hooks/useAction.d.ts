import type { ActionType } from '../interface';
declare type ActionTypes = ActionType | ActionType[];
export default function useAction(mobile: boolean, action: ActionTypes, showAction?: ActionTypes, hideAction?: ActionTypes): [showAction: Set<ActionType>, hideAction: Set<ActionType>];
export {};
