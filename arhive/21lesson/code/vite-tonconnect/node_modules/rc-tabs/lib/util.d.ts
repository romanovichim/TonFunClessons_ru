import React from 'react';
/**
 * We trade Map as deps which may change with same value but different ref object.
 * We should make it as hash for deps
 * */
export declare function stringify<K extends string | number | symbol, V>(obj: Record<K, V> | Map<K, V>): string;
export declare function genDataNodeKey(key: React.Key): string;
