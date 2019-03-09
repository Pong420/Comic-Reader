import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Comic } from '../components/Comic';
import { Loading } from '../components/Loading';
import { RootState, ComicState, ComicActionCreators } from '../store';

interface MatchParam {
  comicID: string;
}

function mapStateToProps({ comic }: RootState, ownProps: any) {
  return { ...comic, ...ownProps };
}

function mapDispathToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicActionCreators, dispatch);
}

export function ComicPageComponemt({
  match,
  comicData,
  loading,
  getComic,
  resetComicState
}: RouteComponentProps<MatchParam> & ComicState & typeof ComicActionCreators) {
  useEffect(() => {
    getComic(match.params);

    return () => {
      resetComicState();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Comic {...comicData} />;
}

export const ComicPage = connect(
  mapStateToProps,
  mapDispathToProps
)(ComicPageComponemt);
