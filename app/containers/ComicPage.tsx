import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Comic } from '../components/Comic';
import { getComicData } from '../api';

export function ComicPage({ match }: RouteComponentProps) {
  const [comicData, setComicData] = useState(null);

  useEffect(() => {
    getComicData(match.params).then(data => {
      setComicData(data);
    });
  }, []);

  return <Comic {...comicData} />;
}
