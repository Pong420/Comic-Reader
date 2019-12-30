import { createAxiosInstance } from '../createAxiosInstance';
import { Params$SearchResult, Response$SearchResult } from '../../../typings';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com',
  headers: { 'Content-Type': 'multipart/form-data' }
});

const cacheForTotalResult: Record<string, number> = {};

export async function getSearchResults({
  keyword,
  page = 1,
  order = 0
}: Params$SearchResult): Promise<Response$SearchResult> {
  try {
    const ajax = page === 1 ? 0 : 1;
    const formData = new FormData();
    formData.set('page', String(page));
    formData.set('ajax', String(ajax));
    formData.set('order', String(order));
    formData.set('key', String(keyword));

    const { data: $ } = await api.post<CheerioStatic>(
      `/s/${encodeURIComponent(keyword)}.html`,
      formData
    );

    const li = ajax === 0 ? $('.cont-list li') : $('li');

    const matches = ($('.cat-bar h3').text() || '').match(
      /(?<=共有).*?(?=條)/g
    );

    const total =
      cacheForTotalResult[keyword] || Number(matches && matches[0]) || 0;

    cacheForTotalResult[keyword] = total;

    const searchResults = li.toArray().map(li => {
      const text = (selector: string) =>
        $(li)
          .find(selector)
          .text()
          .trim();

      const comicID = (
        $(li)
          .find('a')
          .attr('href') || ''
      ).replace(/[^\d.]+/g, '');

      const cover = (
        $(li)
          .find('img')
          .attr('data-src') || ''
      ).replace(/\/[a-z]\//, '/h/');

      const name = text('h3');
      const author = text('dl:nth-child(3) dd');
      const category = text('dl:nth-child(4) dd').split(',');
      const latest = text('dl:nth-child(5) dd');
      const updateTime = text('dl:nth-child(6) dd');

      return {
        comicID,
        cover,
        name,
        author,
        category,
        latest,
        updateTime
      };
    });

    return {
      total,
      pageNo: page,
      data: searchResults
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
