import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useAsync } from '../utils/useAsync';
import { Home } from '../components/Home';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getLatestUpdate } from '../api';
import { ComicItemList } from '../../typing';
import LatestUpdateActions from '../actions/latestUpdate';

function mapStateToProps({ latestUpdate }) {
  return {
    ...latestUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LatestUpdateActions, dispatch);
}

interface Props extends RouteComponentProps {
  comicList: ComicItemList;
  setComics: (comicList: ComicItemList) => void;
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ comicList, setComics }: Props) => {
  const { error, isLoading, reload } = useAsync<ComicItemList>({
    deferFn() {
      return comicList.length ? Promise.resolve(comicList) : getLatestUpdate();
    },
    onResolve(data) {
      setComics(data);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error} reload={reload} />;
  }

  if (comicList.length) {
    return <Home />;
  }

  return null;
});
