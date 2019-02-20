import { api } from './api';
import { GetComicDataParam, Chapters } from '../../../typing';

const LZString = require('./utils/LZString');

export async function getComicData({ comicID }: GetComicDataParam) {
  const { data: $ } = await api.get(`/comic/${comicID}/`);

  const cover = $('.hcover img').attr('src');
  const latest = $('.hcover .text').text();
  const finished = !$('.hcover .serial').length;
  const intro = $('.book-intro #intro-all').text();
  const title = $('.book-title')
    .children()
    .map((index: number, c: CheerioElement) => $(c).text())
    .toArray();

  const adultOnly = !!$('#checkAdult').length;

  const details = $('.detail-list li > span')
    .map((index: number, details: CheerioElement) => {
      const $val = $(details)
        .contents()
        .filter((index: number, el: CheerioElement) => el.tagName !== 'strong');

      return {
        key: $(details)
          .find('strong')
          .text(),
        val: $val
          .map((index: number, el: CheerioElement) => {
            const text = $(el).text();
            // FIXME:
            // @ts-ignore
            if (el.nodeType === 3) {
              return text;
            }
            return `<span>${text}</span>`;
          })
          .toArray()
          .join('')
      };
    })
    .toArray();

  if (adultOnly) {
    try {
      $('#erroraudit_show').replaceWith(
        $(LZString.decompressFromBase64($('#__VIEWSTATE').attr('value')))
      );
    } catch (err) {
      console.log(err);
    }
  }

  const chapters: Chapters = {};

  $('.chapter')
    .children()
    .each((index: number, child: CheerioElement) => {
      if ($(child).get(0).tagName == 'h4') {
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

        chapters[$(child).text()] = arr.map(chapter => {
          const $aTag = $(chapter).find('a');

          return {
            chapterID: $aTag
              .attr('href')
              .replace(/.*\/(?=[^\/].*$)|.html/g, ''),
            title: $aTag.attr('title'),
            p: $aTag.find('i').text(),
            isNew: !!$(chapter).find('.new').length
          };
        });
      }
    });

  return {
    comicID,
    cover,
    latest,
    finished,
    intro,
    title,
    details,
    chapters,
    adultOnly,
    name: title[0],
    updateTime: $('.detail-list li > span span:nth-of-type(2)').text()
  };
}
