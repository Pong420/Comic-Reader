import { api } from './api';
import { GetLatestUpdateParam } from '../../../typing/index';

export async function getLatestUpdate({ page = 1 }: GetLatestUpdateParam) {
  const page_ = page === 1 ? '' : `_p${page}`;
  const { data: $ } = await api.get(`/list/update${page_}.html`);

  const comicList = $('#contList li')
    .map((index: number, item: CheerioElement) => {
      const $item = $(item);
      const $cover = $item.find('.bcover img');
      const $latest = $item.find('.tt');
      const $aTag = $item.find('.ell a');
      const $updateTime = $item.find('.updateon');
      const $status = $item.find('.bcover span:last-child');

      const cover = $cover.attr('src') || $cover.attr('data-src');

      return {
        comicID: $aTag.attr('href').replace(/[^\d.]+/g, ''),
        name: $aTag.attr('title'),
        cover: cover.replace(/\/[a-z]\//, '/h/'),
        latest: $latest.text(),
        updateTime: $updateTime.text(),
        status: $status.attr('class') === 'sl' ? '連載' : '完結'
      };
    })
    .toArray();

  return comicList;
}
