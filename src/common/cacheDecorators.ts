function getConstructorName(obj: object): string {
    const name = obj.constructor.name;
    if (!name) return '<unnamed>';
    return name;
}

function getStringifyMethodName(obj: object, property: string | symbol): string {
    return `${getConstructorName(obj)}#${String(property)}`;
}

export const CacheGetter = (): MethodDecorator => {
    const data = new WeakMap();
    return <T>(_target: object, property: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
        const getter = descriptor.get;
        if (getter === undefined) return;
        descriptor.get = function (this: object) {
            if (data.has(this)) {
                // log.Cache.info('CacheGetter %s (hit)', getStringifyMethodName(this, property));
                return data.get(this) as T;
            }
            // log.Cache.info(
            //     'CacheGetter %s (miss). Calling the original getter.',
            //     getStringifyMethodName(this, property)
            // );
            const res = getter.apply(this);
            data.set(this, res);
            return res;
        };
    };
};

export const NoArgsCache = (): MethodDecorator => {
    const data = new WeakMap();
    return (_target: object, property: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const oldMethod = descriptor.value;
        if (typeof oldMethod !== 'function') return;
        descriptor.value = function (this: object) {
            if (data.has(this)) {
                // log.Cache.info('NoArgsCache %s (hit).', getStringifyMethodName(this, property));
                return data.get(this);
            }
            // log.Cache.info(
            //     'NoArgsCache %s (miss). Calling the original getter',
            //     getStringifyMethodName(this, property)
            // );
            const res = oldMethod.apply(this);
            data.set(this, res);
            return res;
        };
    };
};

export type CacheEntry<T = unknown> = {
    result: T;
    updatedAt_ms: number;
};

export type GenerateLookupKeyFn<ThisObj, Args> = (thisObj: ThisObj, args: Args) => string | undefined;

export type Invalidatable<ThisObj, Args> = {
    invalidate(thisObj: ThisObj, args: Args): void;
    invalidateAll(): void;
};

export const GlobalCache = <
    ThisObj extends object,
    MethodName extends keyof ThisObj | undefined = undefined,
    Args = undefined extends MethodName
        ? readonly unknown[]
        : ThisObj[NonNullable<MethodName>] extends (..._args: infer InferredArgs extends readonly unknown[]) => unknown
          ? InferredArgs
          : readonly unknown[],
>(params: {
    generateLookupKey: (thisObj: ThisObj, args: Args) => string | undefined;
    ttl_ms?: number | 'infinity';

    /**
     * @default 2
     * @remarks
     * To avoid the cache growing too big, clean up should be performed.
     * Instead of doing this in interval (such as in https://www.npmjs.com/package/lru-ttl-cache),
     * this utility decorator will perform cleanup per access.
     *
     * Up to `maxEntriesToCleanUpPerAccess` will be deleted if they are expired.
     *
     * Default to 2, so that the clean up is minimal, and the cleaning rate will
     * be greater than the insertion rate.
     */
    maxEntriesToCleanUpPerAccess?: number;

    // TODO add size restriction?
}): MethodDecorator => {
    // TODO log clean up logic from another PR
    const { generateLookupKey, ttl_ms = 5 * 60 * 1000, maxEntriesToCleanUpPerAccess = 2 } = params;
    const data = new Map<string, CacheEntry>();
    const cleanUp = (expiryTime_ms: number) => {
        for (let i = 0; i < maxEntriesToCleanUpPerAccess; ++i) {
            const { done, value } = data.entries().next();
            if (done) break;
            if (value[1].updatedAt_ms > expiryTime_ms) break;
            data.delete(value[0]);
        }
    };
    return (_target: object, property: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const oldMethod = descriptor.value;
        if (typeof oldMethod != 'function') return;
        const res = function (this: ThisObj, ...args: unknown[]) {
            const key = generateLookupKey(this, args as Args);
            if (key == undefined) {
                // log.Cache.info(
                //     'GlobalCache %s got undefined key (miss). Getting fresh value.',
                //     getStringifyMethodName(this, property)
                // );
                return oldMethod.apply(this, args);
            }
            const entry = data.get(key);
            const now_ms = Date.now();
            const expiryTime_ms = ttl_ms === 'infinity' ? Number.NEGATIVE_INFINITY : now_ms - ttl_ms;
            if (entry != undefined) {
                const isStillValid = entry.updatedAt_ms > expiryTime_ms;
                if (isStillValid) {
                    // log.Cache.info(
                    //     'GlobalCache %s with key %s (hit). Value is still valid. (now: %o, lastUpdatedAt: %o, ttl_ms: %s)',
                    //     getStringifyMethodName(this, property),
                    //     key,
                    //     new Date(),
                    //     new Date(entry.updatedAt_ms),
                    //     ttl_ms
                    // );
                    return entry.result;
                }
            }
            // log.Cache.info(
            //     'GlobalCache %s with key %s (miss). Getting new value. (now: %o, lastUpdatedAt: %o, ttl_ms: %s)',
            //     getStringifyMethodName(this, property),
            //     key,
            //     new Date(),
            //     entry ? new Date(entry.updatedAt_ms) : undefined,
            //     ttl_ms
            // );
            const result = oldMethod.apply(this, args);

            // JS map will maintain the entries in the [insertion order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator)
            // delete key here to maintain the entries by **update time**.
            data.delete(key);
            data.set(key, { result, updatedAt_ms: now_ms });
            cleanUp(expiryTime_ms);

            return result;
        };
        res.invalidate = (thisObj: ThisObj, args: Args) => {
            const key = generateLookupKey(thisObj, args);
            if (key) data.delete(key);
        };

        res.invalidateAll = () => {
            data.clear();
        };
        descriptor.value = res satisfies Invalidatable<ThisObj, Args>;
    };
};

export function getGlobalCacheInvalidator<T, const Method extends keyof T>(
    klass: { prototype: T },
    method: Method
): T[Method] extends (..._params: infer Args) => unknown ? Invalidatable<T, Args> | undefined : never;

export function getGlobalCacheInvalidator(
    klass: { prototype: unknown },
    method: string
): Invalidatable<unknown, unknown[]> | undefined {
    const proto = klass.prototype as Record<string, unknown>;
    const fn = proto[method];
    if (typeof fn !== 'function') return undefined;
    if (!('invalidate' in fn)) return undefined;
    if (typeof fn['invalidate'] !== 'function') return undefined;
    if (!('invalidateAll' in fn)) return undefined;
    if (typeof fn['invalidateAll'] !== 'function') return undefined;

    // TODO further checking?
    return fn as Invalidatable<unknown, unknown[]>;
}
