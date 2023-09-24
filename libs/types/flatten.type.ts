/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Entry = { key: string; value: any; optional: boolean };

type Explode<T> = _Explode<T extends readonly any[] ? { '0': T[number] } : T>;

type _Explode<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? Explode<T[K]> extends infer E
          ? E extends Entry
            ? {
                key: `${K}${E['key'] extends '' ? '' : '.'}${E['key']}`;
                value: E['value'];
                optional: E['key'] extends ''
                  ? {} extends Pick<T, K>
                    ? true
                    : false
                  : E['optional'];
              }
            : never
          : never
        : never;
    }[keyof T]
  : { key: ''; value: T; optional: false };
type Collapse<T extends Entry> = {
  [E in Extract<T, { optional: false }> as E['key']]: E['value'];
} & Partial<{
  [E in Extract<T, { optional: true }> as E['key']]: E['value'];
}> extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
// ? { [K in keyof O]: O[K] }
// : never;

export type Flatten<T> = Collapse<Explode<T>>;
