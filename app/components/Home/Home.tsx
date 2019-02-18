import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { HomeHeader } from './HomeHeader';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { getLatestUpdate } from '../../api';
import { ComicItemList } from '../../../typing';
import LatestUpdateActions, {
  AddComicsPayload
} from '../../actions/latestUpdate';

export interface HomeProps {
  page: number;
  comicList: ComicItemList;
  addComics: (args: AddComicsPayload) => void;
}

function mapStateToProps({ latestUpdate }) {
  return {
    ...latestUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LatestUpdateActions, dispatch);
}

const placeholders = new Array(42).fill({}) as ComicItemList;

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({ page, comicList, addComics }: HomeProps) {
  const tabs = ['最新更新', '收藏'];

  const loadMoreLatestComic = () => {
    const nextPage = page + 1;
    const from = comicList.length;
    const to = comicList.length + placeholders.length;

    addComics({
      comicList: placeholders.slice(0),
      page: nextPage
    });

    return getLatestUpdate({ page: nextPage }).then(comicList =>
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
      <HomeHeader tabs={tabs} onChange={label => {}} />
      <div className="home-grids">
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
      </div>
    </Layout>
  );
});
