export function transformDatabyIds<T extends { [key: string]: any }, K extends keyof T>(items: T[], key: K) {
  const ids: Array<T[K]> = [];
  const byIds = items.reduce<{ [id: string]: T }>((result, item) => {
    const id = item[key];
    ids.push(id);
    result[id] = item;
    return result;
  }, {});

  return { byIds, ids };
}
