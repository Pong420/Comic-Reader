import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { ComicHeader } from './ComicHeader';
import { ComicContent } from './ComicContent';
import { RootState, ComicState, ComicActionCreators } from '../../store';

interface MatchParams {
  comicID: string;
}

const mapStateToProps = ({
  comic,
  browsingHistory: { browsingHistory }
}: RootState) => ({ ...comic, browsingHistory });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ComicActionCreators, dispatch);

type Props = RouteComponentProps<MatchParams> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function ComicComponent({
  match,
  error,
  loading,
  comicData,
  browsingHistory,
  getComic,
  cancelGetComic
}: Props) {
  const { comicID } = match.params;
  const containerElRef = useRef<HTMLDivElement>(null);
  const visited = new Map(browsingHistory).get(comicID);

  useEffect(() => {
    getComic(comicID);
    return () => {
      cancelGetComic();
    };
  }, [cancelGetComic, comicID, getComic]);

  return (
    <Layout error={error} loading={loading}>
      <div className="comic" ref={containerElRef}>
        <ComicHeader {...comicData} />
        <ComicContent {...comicData} visited={visited} />
      </div>
    </Layout>
  );
}

export const Comic = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicComponent);
