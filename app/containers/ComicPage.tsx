import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Comic } from '../components/Comic';
import { ComicActionCreators } from '../store';

interface MatchParam {
  comicID: string;
}

function mapDispathToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicActionCreators, dispatch);
}

export function ComicPageComponemt({
  match,
  getComic
}: RouteComponentProps<MatchParam> & typeof ComicActionCreators) {
  useEffect(() => {
    getComic(match.params);
  }, []);

  return <Comic />;
}

export const ComicPage = connect(
  null,
  mapDispathToProps
)(ComicPageComponemt);
