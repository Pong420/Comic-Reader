import React, { useEffect, useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { HomeGrid } from './HomeGrid';
import { RootState, getComics, getMoreComics } from '../../store';

const mapStateToProps = (state: RootState) => ({
  comics: state.comics.ids,
  noMoreComics: state.comics.noMore
});

const error = {
  response: {
    status: '404',
    statusText:
      '暫時沒有此類別組合的漫畫。您可以縮小類別組合進行篩選。或重新篩選。'
  }
};

export function HomeComponent({
  comics,
  dispatch,
  location,
  noMoreComics
}: DispatchProp & RouteComponentProps & ReturnType<typeof mapStateToProps>) {
  const loadMore = useCallback(() => {
    !noMoreComics && dispatch(getMoreComics());
  }, [dispatch, noMoreComics]);

  useEffect(() => {
    dispatch(getComics());
  }, [dispatch]);

  return (
    <Layout error={comics.length === 0 ? error : null}>
      <div className="home">
        <GridContainer
          items={comics}
          loadMore={loadMore}
          scrollPostionKey={location.pathname}
          onGridRender={comicID => <HomeGrid comicID={comicID} />}
        />
      </div>
    </Layout>
  );
}

export const Home = connect(mapStateToProps)(HomeComponent);
