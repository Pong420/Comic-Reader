import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
import { RootState, ComicState, ComicActionCreators } from '../../store';

// TODO:
// restore scroll position
// browsing history

interface MatchParams {
  comicID: string;
}

const mapStateToProps = ({ comic }: RootState) => ({ ...comic });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ComicActionCreators, dispatch);

function ComicComponent({
  match,
  error,
  loading,
  comicData,
  getComic,
  cancelGetComic
}: ComicState & typeof ComicActionCreators & RouteComponentProps<MatchParams>) {
  const { comicID } = match.params;
  const contentElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getComic(comicID);
    return () => {
      cancelGetComic();
    };
  }, [cancelGetComic, comicID, getComic]);

  return (
    <Layout error={error} loading={loading}>
      <div className="comic" ref={contentElRef}>
        <ComicHeader {...comicData} />
        <ComicContent {...comicData} />
      </div>
    </Layout>
  );
}

export const Comic = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicComponent);
