export type Nil = null | undefined;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Nullish<T> = T | Nil;

export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
