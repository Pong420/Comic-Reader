import React from 'react';
import { ComicHeader } from '../../../../typing';

export function ComicHeader({
  cover,
  title = [],
  details = [],
  intro
}: ComicHeader) {
  return (
    <div className="comic-header">
      <div className="comic-cover">
        <div style={{ backgroundImage: `url(${cover})` }} />
      </div>
      <div className="comic-info">
        <div className="comic-title">
          <h1>{title[0]}</h1>
          <h2>{title[1]}</h2>
        </div>
        <div className="comic-title" />
        <div className="comic-details">
          {details.map(({ key, val }, index: number) => (
            <div className="comic-details-item" key={index}>
              <span>{key}</span>
              <span dangerouslySetInnerHTML={{ __html: val }} />
            </div>
          ))}
        </div>
        <div className="comic-intro">{intro}</div>
      </div>
    </div>
  );
}
