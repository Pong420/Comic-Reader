import React, { useEffect, useCallback } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { HomeGrid } from './HomeGrid';
import { RootState, getComics, getMoreComics } from '../../store';

const mapStateToProps = (state: RootState) => ({
  comics: state.comics.ids,
  noMoreComics: state.comics.noMore
});

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
    <Layout>
      <div className="home">
        <AutoSizer>
          {dimen => (
            <GridContainer
              {...dimen}
              items={comics}
              loadMore={loadMore}
              scrollPostionKey={location.pathname}
              onGridRender={comicID => <HomeGrid comicID={comicID} />}
            />
          )}
        </AutoSizer>
      </div>
    </Layout>
  );
}

export const Home = connect(mapStateToProps)(HomeComponent);
