export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (!isEqual(value as PlainObject, rightValue as PlainObject)) {
        return false;
      }
    } else if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;
