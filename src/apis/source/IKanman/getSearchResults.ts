import { createAxiosInstance } from '../createAxiosInstance';
import { Param$SearchResult, Response$SearchResult } from '../../../typings';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com',
  headers: { 'Content-Type': 'multipart/form-data' }
});

export async function getSearchResults({
  keyword,
  page = 1,
  order = 0
}: Param$SearchResult): Promise<Response$SearchResult> {
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

    const searchResults = li.toArray().reduce<Response$SearchResult>(
      (data, li) => {
        const text = (selector: string) =>
          $(li)
            .find(selector)
            .text()
            .trim();

        const comicID = $(li)
          .find('a')
          .attr('href')
          .replace(/[^\d.]+/g, '');

        const cover = $(li)
          .find('img')
          .attr('data-src')
          .replace(/\/[a-z]\//, '/h/');

        const name = text('h3');
        const author = text('dl:nth-child(3) dd');
        const category = text('dl:nth-child(4) dd').split(',');
        const latest = text('dl:nth-child(5) dd');
        const updateTime = text('dl:nth-child(6) dd');

        data.ids.push(comicID);

        data.byIds[comicID] = {
          comicID,
          cover,
          name,
          author,
          category,
          latest,
          updateTime
        };

        return data;
      },
      {
        byIds: {},
        ids: []
      }
    );

    return searchResults;
  } catch (err) {
    return Promise.reject({
      response: {
        status: '',
        statusText: err
      }
    });
  }
}
