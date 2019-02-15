import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(function({ page, comicList, addComics }: HomeProps) {
  const tabs = ['最新更新', '收藏'];
  const [currentSection, setCurrentSection] = useState(tabs[0]);

  return (
    <Layout className="home">
      <HomeHeader tabs={tabs} onChange={label => setCurrentSection(label)} />
      <HomeGridContainer
        hidden={currentSection !== tabs[0]}
        list={comicList}
        render={props => <ComicItem {...props} />}
        onLoadMore={() =>
          getLatestUpdate({ page: page + 1 }).then(comicList =>
            addComics({
              comicList,
              page: page + 1
            })
          )
        }
      />
    </Layout>
  );
});
