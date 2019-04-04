import React, { useEffect, useState, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, GridHandler } from '../GridContainer';
import { Grid } from '../Grid';
import { RootState, HomeState, HomeActionCreators } from '../../store';

const mapStateToProps = ({ home }: RootState, ownProps: any) => ({ ...home, ...ownProps });
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(HomeActionCreators, dispatch);

export function HomeComponent({
  page,
  filter,
  noMoreComicResults,
  comicList,
  getComicList,
  getMoreComicList,
  cancelGetComicList
}: HomeState & typeof HomeActionCreators) {
  const loadMore = useCallback(() => !noMoreComicResults && getMoreComicList({ page, filter }), [
    noMoreComicResults,
    getMoreComicList,
    page,
    filter
  ]);

  useEffect(() => {
    getComicList({ page: 1, filter });

    return () => {
      cancelGetComicList();
    };
  }, [cancelGetComicList, filter, getComicList]);

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
