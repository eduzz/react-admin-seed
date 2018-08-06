export type DeepReadonly<T> =
  T extends Array<any> ?
  ReadonlyArray<T[0]> :
  T extends ReadonlyArray<any> ?
  T :
  T extends Date ?
  T :
  T extends Function ?
  T :
  T extends object ?
  { readonly [P in keyof T]: DeepReadonly<T[P]> } :
  T;

export type Writable<T> =
  T extends ReadonlyArray<any> ?
  Array<WritableObject<T[0]>> :
  T extends Array<any> ?
  Array<WritableObject<T[0]>> :
  WritableObject<T>;

type WritableObject<T> =
  T extends Date ?
  T :
  T extends Function ?
  T :
  T extends object ?
  { -readonly [P in keyof T]: Writable<T[P]> } :
  T;

const data = { name: 'daniel', age: 26, date: new Date, cars: { color: 'yellow' } };
const state: DeepReadonly<typeof data> = data;

data.age = 3;
state.age = 3;
state.cars.color = 'red';

const write = makeWritable(state);
write.age = 4;

export function makeWritable<T>(data: T): Writable<T> {
  return JSON.parse(JSON.stringify(data));
}
