import { createAxiosInstance } from '../../axios.config';
import { SearchParam } from '../../../typing';

const api = createAxiosInstance({
  baseURL: 'https://m.manhuagui.com'
});

export async function search({ keyword, page = 1 }: SearchParam) {
  try {
    const { data: $ } = await api.get(
      `/s/${encodeURIComponent(keyword)}.html?page=${page}&ajax=1`
    );

    const searchResult = $('li')
      .map((index: number, li: CheerioElement) => {
        const cover = $(li)
          .find('img')
          .attr('data-src');

        const name = $(li)
          .find('h3')
          .text();

        const author = $(li)
          .find('dl:nth-child(1) dd')
          .text();
        const category = $(li)
          .find('dl:nth-child(2) dd')
          .text();
        const latest = $(li)
          .find('dl:nth-child(3) dd')
          .text();
        const updateTime = $(li)
          .find('dl:nth-child(4) dd')
          .text();

        return {
          cover,
          name,
          author,
          category,
          latest,
          updateTime
        };
      })
      .toArray();

    return searchResult;
  } catch (err) {
    console.log(err);
    return [];
  }
}
