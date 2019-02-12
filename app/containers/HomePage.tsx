import React, { useEffect, useState } from 'react';
import { Home } from '../components/Home';
import { getLatestUpdate } from '../api';

export function HomePage() {
  const [comicList, setComicList] = useState([]);

  useEffect(() => {
    getLatestUpdate()
      .then(data => {
        setComicList(data);
      })
      .catch(err => console.log(err));
  }, []);

  return <Home comicList={comicList} />;
}
