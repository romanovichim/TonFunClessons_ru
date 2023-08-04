import type { KeyType } from '../Cache';
export default function useClientCache<CacheType>(prefix: string, keyPath: KeyType[], cacheFn: () => CacheType, onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void): CacheType;
