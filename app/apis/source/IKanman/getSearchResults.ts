import { createAxiosInstance } from '../../createAxiosInstance';
import { GetSearchResultsParam, ApiError } from '../../../../typing';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com'
});

export async function getSearchResults({
  keyword,
  page = 1
}: GetSearchResultsParam) {
  try {
    const { data: $ } = await api.get(
      `/s/${encodeURIComponent(keyword)}.html?page=${page}&ajax=1`
    );

    const searchResult = $('li')
      .map((index: number, li: CheerioElement) => {
        const comicID = $(li)
          .find('a')
          .attr('href')
          .replace(/[^\d.]+/g, '');

        const cover = $(li)
          .find('img')
          .attr('data-src')
          .replace(/\/[a-z]\//, '/h/');

        const name = $(li)
          .find('h3')
          .text();

        const author = $(li)
          .find('dl:nth-child(1) dd')
          .text();
        const category = $(li)
          .find('dl:nth-child(2) dd')
          .text()
          .split(',');
        const latest = $(li)
          .find('dl:nth-child(3) dd')
          .text();
        const updateTime = $(li)
          .find('dl:nth-child(4) dd')
          .text();

        return {
          comicID,
          cover,
          name,
          author,
          category,
          latest,
          updateTime
        };
      })
      .toArray();

    return searchResult || [];
  } catch (err) {
    return Promise.reject({
      response: {
        status: '',
        statusText: err
      }
    } as ApiError);
  }
}
