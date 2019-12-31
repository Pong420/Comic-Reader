export function LocalStorage<T extends {}>(
  key: string,
  defaultValue: T
): Schema$Storage<T> {
  function get(): T {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  }

  function save(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    get,
    save
  };
}
