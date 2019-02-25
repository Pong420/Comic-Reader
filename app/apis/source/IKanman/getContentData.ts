import { api } from './api';
import { GetContentDataParam, ContentData } from '../../../../typing';
import './utils/splic';

interface SMH {
  imgData?: (
    n: Variables
  ) => {
    preInit: () => void;
  };
}

interface Variables {
  bid?: number;
  bname?: string;
  bpic?: string;
  cid?: number;
  cname?: string;
  files?: string[];
  finished?: boolean;
  len?: number;
  path?: string;
  status?: number;
  block_cc?: string;
  nextId?: number;
  prevId?: number;
  sl?: Sl;
}

export interface Sl {
  [key: string]: string;
  md5: string;
}

export async function getContentData({
  comicID,
  chapterID
}: GetContentDataParam) {
  const { data: $ } = await api.get(`/comic/${comicID}/${chapterID}.html`);

  let variables: Variables = {};

  const SMH: SMH = {};
  SMH.imgData = (n: Variables) => ({
    preInit: () => {
      variables = n;
    }
  });

  $('script').each((_: number, script: CheerioElement) => {
    try {
      const { data } = $(script).get()[0].children[0];
      const regex = /window\[\"\\x65\\x76\\x61\\x6c\"\]/g;
      if (regex.test(data)) {
        eval(eval(data.replace(regex, '')));
      }
    } catch (e) {}
  });

  const { path, files = [], cid, sl, prevId, nextId } = variables;
  let images: string[] = [];

  if (path) {
    images = files.map(name => {
      let url = `https://i.hamreus.com${path}${name}?cid=${cid}`;

      for (const i in sl) {
        url += `&${i}=${sl[i]}`;
      }

      return url;
    });
  }

  const result: ContentData = {
    images,
    prevId,
    nextId
  };

  return result;
}
