import React, { useState, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { HomeHeader } from './HomeHeader';
import { HomeGridContainer } from './HomeGridContainer';
import { ComicItem } from './ComicItem';
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

const placeHolder = new Array(42).fill({}) as ComicItemList;

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({ page, comicList, addComics }: HomeProps) {
  const tabs = ['最新更新', '收藏'];
  const [currentSection, setCurrentSection] = useState(tabs[0]);
  const gridSizerRef = useRef(null);

  const nextPage = page + 1;
  const loadMoreLatestComic = () => {
    const from = comicList.length;
    const to = comicList.length + placeHolder.length;

    addComics({
      comicList: placeHolder.slice(0),
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
      <HomeHeader tabs={tabs} onChange={label => setCurrentSection(label)} />
      <div className="home-grids">
        <AutoSizer>
          {dimension => (
            <>
              <HomeGridContainer
                {...dimension}
                gridEl={gridSizerRef.current}
                list={comicList}
                hidden={currentSection !== tabs[0]}
                onGridRender={props => <ComicItem {...props} />}
                loadMore={loadMoreLatestComic}
              />
            </>
          )}
        </AutoSizer>
        <div className="home-grid-sizer-container">
          <div ref={gridSizerRef} />
        </div>
      </div>
    </Layout>
  );
});
