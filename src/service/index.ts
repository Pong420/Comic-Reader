import { Params$ComicDetails } from '../typings';
import { getComicDetails } from './source/IKanman';
import pick from 'lodash/pick';

export * from './source/IKanman';

export function getGridData(params: Params$ComicDetails) {
  return getComicDetails(params).then<Schema$GridData>(data =>
    pick(data, ['comicID', 'cover', 'name', 'latest', 'updateTime', 'author'])
  );
}
