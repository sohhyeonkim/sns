export const cleanObject = <T = Record<string, unknown>>(obj: T): T => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (typeof obj[propName] === 'object') {
        cleanObject(obj[propName]);
      }

      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  return obj;
};

export const stringify = (objFromJson: unknown): string => {
  if (
    typeof objFromJson !== 'object' ||
    objFromJson === null ||
    Array.isArray(objFromJson)
  ) {
    // not an object, stringify using native function
    return JSON.stringify(objFromJson);
  }

  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  const guardedObject = objFromJson as Record<string, unknown>;
  const props = Object.keys(guardedObject)
    .map((key) => `${key}:${stringify(guardedObject[key])}`)
    .join(',');

  return `{${props}}`;
};
