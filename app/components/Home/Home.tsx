import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { getComicListAPI } from '../../apis';
import { ComicItemList } from '../../../typing';
import ComicListActionCreator, {
  ComicListActions
} from '../../actions/comicList';
import { RootState } from '../../reducers';
import { ComicListState } from '../../reducers/comicList';

const placeholders: ComicItemList = new Array(42).fill({});

function mapStateToProps({ comicList }: RootState, ownProps: any) {
  return { ...comicList, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicListActionCreator, dispatch);
}

function HomeComponent({
  page,
  comicList,
  filter,
  noMoreComicResults,
  addComics,
  setNoMoreComicResult
}: ComicListState & ComicListActions) {
  const loadMoreLatestComic = (pageNo = page) => {
    if (!noMoreComicResults) {
      const nextPage = pageNo + 1;
      const from = comicList.length;
      const to = comicList.length + placeholders.length;

      addComics({
        comicList: placeholders.slice(0),
        page: nextPage
      });

      return getComicListAPI({
        page: nextPage,
        filter
      }).then(comicList => {
        setNoMoreComicResult(comicList.length < placeholders.length);

        addComics({
          comicList,
          page: nextPage,
          from,
          to
        });
      });
    }

    return Promise.resolve();
  };

  useEffect(() => {
    !comicList.length && loadMoreLatestComic(0);
  }, []);

  return (
    <Layout className="home">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            onGridRender={props => <Grid {...props} />}
            loadMore={loadMoreLatestComic}
            resetScrollPostion={page === 1}
          />
        )}
      </AutoSizer>
    </Layout>
  );
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
