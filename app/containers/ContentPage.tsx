import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../components/Content';
import { getContentData } from '../api';
import { GetContentDataParam } from '../../typing';

interface MatchParam extends GetContentDataParam {
  pageNo: string;
}

export function ContentPage({ match }: RouteComponentProps<MatchParam>) {
  const [contentData, setContentData] = useState(null);
  const { pageNo, ...params } = match.params;

  useEffect(() => {
    getContentData(params).then(data => {
      setContentData(data);
    });
  }, []);

  return <Content {...contentData} pageNo={pageNo} />;
}
