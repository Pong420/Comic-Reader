import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
// import { useRestoreScrollPosition } from '../../utils/useRestoreScrollPosition';
import { RootState, ComicState, ComicActionCreators } from '../../store';

interface MatchParams {
  comicID: string;
}

const mapStateToProps = ({ comic }: RootState) => ({ ...comic });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ComicActionCreators, dispatch);

function ComicComponent({
  match,
  comicData,
  loading,
  error,
  getComic,
  cancelGetComic
}: ComicState & typeof ComicActionCreators & RouteComponentProps<MatchParams>) {
  const { comicID } = match.params;
  const contentElRef = useRef<HTMLDivElement>(null);
  // const { adultOnly, chapters, ...comicHeaderProps } = comicData!;

  // useRestoreScrollPosition(contentElRef, comicID, [comicData]);

  useEffect(() => {
    getComic({ comicID });

    return () => {
      cancelGetComic();
    };
  }, [cancelGetComic, comicID, getComic]);

  return (
    <Layout
      className="comic"
      ref={contentElRef}
      loading={loading}
      error={error}
    >
      <ComicHeader {...comicData!} />
      <ComicContent {...comicData!} />
    </Layout>
  );
}

export const Comic = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicComponent);
