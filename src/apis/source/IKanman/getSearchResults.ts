import { createAxiosInstance } from '../createAxiosInstance';
import { Param$SearchResult, Schema$SearchResult } from '../../../typings';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com'
});

export async function getSearchResults({
  keyword,
  page = 1
}: Param$SearchResult): Promise<Schema$SearchResult[]> {
  try {
    const { data: $ } = await api.get<CheerioStatic>(
      `/s/${encodeURIComponent(keyword)}.html?page=${page}&ajax=1`
    );

    const searchResult = $('li')
      .toArray()
      .map(li => {
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
        const author = text('dl:nth-child(1) dd');
        const category = text('dl:nth-child(2) dd').split(',');
        const latest = text('dl:nth-child(3) dd');
        const updateTime = text('dl:nth-child(4) dd');

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

    return searchResult;
  } catch (err) {
    return Promise.reject({
      response: {
        status: '',
        statusText: err
      }
    });
  }
}
