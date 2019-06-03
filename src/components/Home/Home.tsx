import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { Layout } from '../Layout';
import { GridContainer } from '../GridContainer';
import { Grid } from '../Grid';
import { RootState, HomeActionCreators } from '../../store';

const mapStateToProps = ({ home }: RootState) => ({ ...home });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(HomeActionCreators, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function HomeCompomnent({
  error,
  loading,
  comicList,
  getComicList,
  getMoreComicList
}: Props) {
  useEffect(() => {
    getComicList();
  }, [getComicList]);

  return (
    <Layout error={error} loading={loading}>
      <div className="home">
        <AutoSizer>
          {dimen => (
            <GridContainer
              {...dimen}
              items={comicList}
              loadMore={getMoreComicList}
              onGridRender={props => <Grid {...props} />}
              scrollPostionKey="home"
            />
          )}
        </AutoSizer>
      </div>
    </Layout>
  );
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCompomnent);
