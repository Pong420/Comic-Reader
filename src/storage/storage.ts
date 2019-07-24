import fs from 'fs';
import { writeFileSync } from '../utils/writeFileSync';

export class Storage<T extends {}> {
  private path: string;

  constructor(path: string, defaultValue: T) {
    this.path = path;

    if (!fs.existsSync(path)) {
      this.save(defaultValue);
    }
  }

  get(): T {
    return JSON.parse(fs.readFileSync(this.path, 'utf8'));
  }

  save(value: T) {
    writeFileSync(this.path, value);
  }
}
