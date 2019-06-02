import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
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
    <div className="comic" ref={contentElRef}>
      <ComicHeader {...comicData} />
      <ComicContent {...comicData} />
    </div>
  );
}

export const Comic = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicComponent);
