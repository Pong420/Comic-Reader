import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Comic } from '../components/Comic';
import { ComicActionCreators } from '../store';

interface MatchParam {
  comicID: string;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicActionCreators, dispatch);
}

export function ComicPageComponemt({
  match,
  getComic,
  cancelGetComic
}: RouteComponentProps<MatchParam> & typeof ComicActionCreators) {
  useEffect(() => {
    getComic(match.params);

    return () => {
      cancelGetComic();
    };
  }, [match.params]);

  return <Comic />;
}

export const ComicPage = connect(
  null,
  mapDispatchToProps
)(ComicPageComponemt);
