import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { getLatestUpdateAPI } from '../../apis';
import { ComicItemList } from '../../../typing';
import LatestUpdateActionCreator, {
  LatestUpdateActions
} from '../../actions/latestUpdate';
import { RootState } from '../../reducers';
import { LatestUpdateState } from '../../reducers/latestUpdate';

const placeholders: ComicItemList = new Array(42).fill({});

function mapStateToProps({ latestUpdate }: RootState, ownProps: any) {
  return { ...latestUpdate, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(LatestUpdateActionCreator, dispatch);
}

function HomeComponent({
  page,
  comicList,
  filter,
  noMoreComicResults,
  addComics,
  setNoMoreComicResult
}: LatestUpdateState & LatestUpdateActions) {
  const loadMoreLatestComic = () => {
    if (!noMoreComicResults) {
      const nextPage = page + 1;
      const from = comicList.length;
      const to = comicList.length + placeholders.length;

      addComics({
        comicList: placeholders.slice(0),
        page: nextPage
      });

      return getLatestUpdateAPI({
        page: nextPage,
        filter
      }).then(comicList => {
        setNoMoreComicResult(comicList.length < 42);

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
