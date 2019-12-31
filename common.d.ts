interface Schema$Storage<T extends {}> {
  get(): T;
  save(value: T): void;
}

declare interface Window {
  bookmarkStorage: any;
  browsingHistoryStorage: any;
}
