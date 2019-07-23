import React, { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { RootState, getComics } from '../../store';

const mapStateToProps = (state: RootState) => ({
  comics: state.comics.ids
});

export function HomeComponent({
  comics,
  dispatch,
  location
}: DispatchProp & RouteComponentProps & ReturnType<typeof mapStateToProps>) {
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
              onGridRender={comicID => <Grid comicID={comicID} />}
              scrollPostionKey={location.pathname}
            />
          )}
        </AutoSizer>
      </div>
    </Layout>
  );
}

export const Home = connect(mapStateToProps)(HomeComponent);
