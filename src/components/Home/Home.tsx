import React, { useEffect, useState, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, GridHandler } from '../GridContainer';
import { Grid } from '../Grid';
import { RootState, HomeState, ComicListActionCreators } from '../../store';

const mapStateToProps = ({ home }: RootState, ownProps: any) => ({ ...home, ...ownProps });
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(ComicListActionCreators, dispatch);

export function HomeComponent({
  page,
  filter,
  comicList,
  getComicList,
  getMoreComicList
}: HomeState & typeof ComicListActionCreators) {
  const loadMore = useCallback(() => getMoreComicList({ page, filter }), [getMoreComicList, page, filter]);

  useEffect(() => {
    getComicList({ page: 1, filter });
  }, [filter, getComicList]);

  return (
    <Layout className="home">
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            loadMore={loadMore}
            onGridRender={props => <Grid {...props} />}
            // handler={gridHandler}
          />
        )}
      </AutoSizer>
    </Layout>
  );
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
