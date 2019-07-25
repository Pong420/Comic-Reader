import { createAxiosInstance } from '../createAxiosInstance';
import { Param$SearchResult, Response$SearchResult } from '../../../typings';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com'
});

export async function getSearchResults({
  keyword,
  page = 1,
  order = 0,
  ajax = 0
}: Param$SearchResult): Promise<Response$SearchResult> {
  try {
    const { data: $ } = await api.post<CheerioStatic>(
      `/s/${encodeURIComponent(keyword)}.html`,
      {
        key: keyword,
        page,
        order,
        ajax
      }
    );

    const searchResults = $('.cont-list li')
      .toArray()
      .reduce<Response$SearchResult>(
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
