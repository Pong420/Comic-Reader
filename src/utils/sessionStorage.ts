export function SessionStorage<T extends {}>(
  key: string,
  defaultValue: T
): Schema$Storage<T> {
  function get(): T {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  function save(value: T) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  return {
    get,
    save
  };
}
