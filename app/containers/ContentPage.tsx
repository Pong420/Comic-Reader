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
  const { pageNo, chapterID, comicID } = match.params;

  useEffect(() => {
    setContentData([]);

    getContentData({
      comicID,
      chapterID
    }).then(data => {
      setContentData(data);
    });
  }, [comicID, chapterID]);

  return <Content {...contentData} pageNo={pageNo} />;
}
