/* eslint-disable */

import { api } from './api';
import { Params$ComicContent, Schema$ComicContent } from '../../../typings';
import './utils/splic';

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

export async function getComicContent({
  comicID,
  chapterID
}: Params$ComicContent): Promise<Schema$ComicContent> {
  try {
    const { data: $ } = await api.get<CheerioStatic>(
      `/comic/${comicID}/${chapterID}.html`
    );

    let variables: Variables = {};

    window.SMH = {
      imgData: n => ({
        preInit: () => {
          variables = n;
        }
      })
    };

    $('script').each((_, script) => {
      try {
        const { data } = $(script).get()[0].children[0];
        const regex = /window\[\"\\x65\\x76\\x61\\x6c\"\]/g;
        if (regex.test(data)) {
          try {
            // tslint:disable-next-line
            eval(eval(data));
          } catch (err) {
            // tslint:disable-next-line
            console.log(err);
          }
        }
      } catch (e) {}
    });

    const { path, files = [], cid, sl, prevId, nextId } = variables;
    let images: string[] = [];

    if (path) {
      images = files.map(name => {
        let url = `https://i.hamreus.com${path}${name}?cid=${cid}`;

        for (const i in sl) {
          if (sl.hasOwnProperty(i)) {
            url += `&${i}=${sl[i]}`;
          }
        }

        return url;
      });
    }

    return {
      images,
      prevId,
      nextId
    };
  } catch (err) {
    return Promise.reject({
      response: {
        status: '',
        statusText: err
      }
    });
  }
}
