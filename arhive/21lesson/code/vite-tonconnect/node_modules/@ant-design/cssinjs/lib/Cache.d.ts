export declare type KeyType = string | number;
declare type ValueType = [number, any];
declare class Entity {
    /** @private Internal cache map. Do not access this directly */
    cache: Map<string, ValueType>;
    get(keys: KeyType[]): ValueType | null;
    update(keys: KeyType[], valueFn: (origin: ValueType | null) => ValueType | null): void;
}
export default Entity;
