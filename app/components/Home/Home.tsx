import React, { useLayoutEffect, useRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer, CustomGridRef } from '../GridContainer';
import { Grid } from '../Grid';
import {
  RootState,
  ComicListState,
  ComicListActionCreators
} from '../../store';

function mapStateToProps({ comicList }: RootState, ownProps: any) {
  return { ...comicList, ...ownProps };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(ComicListActionCreators, dispatch);
}

function HomeComponent({
  page,
  error,
  filter,
  comicList,
  noMoreComicResults,
  getComicList,
  cancelGetComicList
}: ComicListState & typeof ComicListActionCreators) {
  const gridRef = useRef<CustomGridRef>(null);
  const request = () => {
    getComicList({
      page,
      filter
    });
  };

  useLayoutEffect(() => {
    if (!comicList.length) {
      gridRef.current!.scrollTop(0);

      request();

      return () => {
        cancelGetComicList();
      };
    }
  }, []);

  return (
    <Layout className="home" error={error}>
      <AutoSizer>
        {({ width, height }) => (
          <GridContainer
            width={width}
            height={height}
            list={comicList}
            loadMore={() => !noMoreComicResults && request()}
            onGridRender={props => <Grid {...props} />}
            ref={gridRef}
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
