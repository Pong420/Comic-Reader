export function pad<T>(arr: T[], fill: any, length: number) {
  return [...arr, ...new Array(length).fill(fill).slice(arr.length)];
}

export { pad as default };
