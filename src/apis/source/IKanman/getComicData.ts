import { api } from './api';
import { Params$ComicData, Schema$ComicData } from '../../../typings';
import LZString from './utils/LZString';

const chineseConv = require('chinese-conv'); // tslint:disable-line

export async function getComicData({
  comicID
}: Params$ComicData): Promise<Schema$ComicData> {
  try {
    const { data: $ } = await api.get<CheerioStatic>(`/comic/${comicID}/`);

    const cover = $('.hcover img').attr('src');
    const latest = $('.hcover .text')
      .text()
      .trim();
    const intro = $('.book-intro #intro-all')
      .text()
      .trim();
    const title = $('.book-title')
      .children()
      .toArray()
      .map(c => $(c).text());

    const finished = !$('.hcover .serial').length;
    const adultOnly = !!$('#checkAdult').length;

    const details = $('.detail-list li > span')
      .toArray()
      .reduce<Schema$ComicData['details']>((acc, details) => {
        const $val = $(details)
          .contents()
          .filter((_, el) => el.tagName !== 'strong');

        const key = $(details)
          .find('strong')
          .text()
          .replace('：', '');

        acc[key] = $val
          .toArray()
          .map(el => {
            const text = $(el).text();
            // FIXME:
            // @ts-ignore
            if (el.nodeType === 3) {
              return text;
            }
            return `<span>${text}</span>`;
          })
          .join('');

        return acc;
      }, {});

    if (adultOnly || $('.warning-bar')) {
      try {
        $('#erroraudit_show').replaceWith(
          $(LZString.decompressFromBase64($('#__VIEWSTATE').attr('value')))
        );
      } catch (err) {
        console.log(err); // tslint:disable-line
      }
    }

    const types: Schema$ComicData['chapters']['types'] = [];
    const byTypes: Schema$ComicData['chapters']['byTypes'] = {};
    const byIds = $('.chapter')
      .children()
      .toArray()
      .reduce<Schema$ComicData['chapters']['byIds']>((byIds, child) => {
        if ($(child).get(0).tagName === 'h4') {
          let $el = $(child);
          while (!$el.next().hasClass('chapter-list')) {
            $el = $el.next();
          }

          let arr: CheerioElement[] = [];
          const $ul = $el.next().find('ul');

          for (let i = $ul.length - 1; i >= 0; i--) {
            arr = [
              ...arr,
              ...$($ul[i])
                .find('li')
                .toArray()
            ];
          }

          const chapterType = chineseConv.tify($(child).text());

          types.push(chapterType);
          byTypes[chapterType] = [];

          arr.forEach(chapter => {
            const $aTag = $(chapter).find('a');
            const chapterID = $aTag
              .attr('href')
              .replace(/.*\/(?=[^/].*$)|.html/g, '');

            byTypes[chapterType].push(chapterID);

            byIds[chapterID] = {
              chapterID,
              p: $aTag.find('i').text(),
              isNew: !!$(chapter).find('.new').length,
              title: $aTag.attr('title')
            };
          });
        }

        return byIds;
      }, {});

    const author = $(details['漫畫作者'])
      .text()
      .replace(' , ', ' ');

    return {
      comicID,
      cover,
      latest,
      finished,
      intro,
      title,
      details,
      chapters: {
        byIds,
        byTypes,
        types
      },
      adultOnly,
      name: title[0],
      updateTime: $('.detail-list li > span span:nth-of-type(2)').text(),
      author
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
