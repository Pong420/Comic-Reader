import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useAsync } from 'react-async';
import { AxiosError } from 'axios';
import { Home } from '../components/Home';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { getLatestUpdateAPI } from '../apis';
import { ComicItemList } from '../../typing';
import LatestUpdateActionCreators, {
  LatestUpdateActions
} from '../actions/latestUpdate';
import { LatestUpdateState } from '../reducers/latestUpdate';

// FIXME:
function mapStateToProps({ latestUpdate }: any) {
  return {
    ...latestUpdate
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(LatestUpdateActionCreators, dispatch);
}

const HomePageComponent = ({
  comicList,
  setComics
}: LatestUpdateState & LatestUpdateActions & RouteComponentProps) => {
  const { error, isLoading, reload, run } = useAsync<ComicItemList>({
    deferFn() {
      return comicList.length
        ? Promise.resolve(comicList)
        : getLatestUpdateAPI();
    },
    onResolve(data) {
      setComics(data);
    }
  });

  useEffect(() => {
    run();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error {...error as AxiosError} reload={reload} />;
  }

  if (comicList.length) {
    return <Home />;
  }

  return null;
};

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent);
