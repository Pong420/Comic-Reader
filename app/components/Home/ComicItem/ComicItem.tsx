import React from 'react';
import { Link } from 'react-router-dom';
import { ComicItemProps } from '../../../../typing';

export function ComicItem({ comicID, cover, name, latest }: ComicItemProps) {
  return (
    <Link to={`/comic/${comicID}`} className="comic-item">
      <div className="lazyload cover" data-bg={cover.replace('/m/', '/h/')} />
      <div className="caption">
        <div className="name">{name}</div>
        <div className="latest">{latest}</div>
      </div>
    </Link>
  );
}
