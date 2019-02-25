import React from 'react';
import { bindActionCreators } from 'redux';
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
import { LatestUpdateState } from '../../reducers/latestUpdate';

export interface HomeProps extends LatestUpdateState, LatestUpdateActions {}

function mapStateToProps({ latestUpdate }) {
  return {
    ...latestUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LatestUpdateActionCreator, dispatch);
}

const placeholders = new Array(42).fill({}) as ComicItemList;

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({ page, comicList, addComics }: HomeProps) {
  const loadMoreLatestComic = () => {
    const nextPage = page + 1;
    const from = comicList.length;
    const to = comicList.length + placeholders.length;

    addComics({
      comicList: placeholders.slice(0),
      page: nextPage
    });

    return getLatestUpdateAPI({ page: nextPage }).then(comicList =>
      addComics({
        comicList,
        page: nextPage,
        from,
        to
      })
    );
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
          />
        )}
      </AutoSizer>
    </Layout>
  );
});
