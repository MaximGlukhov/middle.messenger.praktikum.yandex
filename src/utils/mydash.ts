export function identity(value: unknown) {
  return value;
}

export function last(arr: unknown[]) {
  return arr[arr.length - 1];
}

export function first(arr: unknown[]) {
  return arr[0];
}

export function range(startOrLength: number, end?: number, step: number = 1, isRight = false) {
  const result: number[] = [];
  let start: number;
  let length: number;

  if (end === undefined) {
    length = startOrLength;
    start = 0;
  } else {
    length = end;
    start = startOrLength;
  }

  if (length < 0) {
    if (step === 0) {
      for (let i = start; i > length; i--) {
        result.push(start);
      }
    } else {
      for (let i = start; i > length; i -= Math.abs(step)) {
        result.push(i);
      }
    }
  } else if (step === 0) {
    for (let i = start; i < length; i++) {
      result.push(start);
    }
  } else {
    for (let i = start; i < length; i += step) {
      result.push(i);
    }
  }

  if (isRight) {
    return result.reverse();
  }
  return result;
}

export function rangeRight(start: number, end: number, step: number) {
  return range(start, end, step, true);
}

export function isEmpty(value: unknown) {
  if (
    typeof value === 'number' ||
    value === '' ||
    value === undefined ||
    value === null ||
    typeof value === 'boolean'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
}

export const debounce = <T extends (...args: string[]) => ReturnType<T>>(
  callback: T,
  timeout: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: false, trailing: true }
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  let leadingCalled = false;

  return (...args: Parameters<T>) => {
    const callNow = options.leading && !leadingCalled;

    clearTimeout(timer);

    if (callNow) {
      leadingCalled = true;
      callback(...args);
    }

    timer = setTimeout(() => {
      leadingCalled = false;
      if (options.trailing) {
        callback(...args);
      }
    }, timeout);
  };
};
