import React from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { ComicItemProps } from '../../../../typing';

const PlaceHodler = () => {
  const width = 360;
  const height = 510;

  return (
    <ContentLoader
      height={height}
      width={width}
      speed={2}
      primaryColor="#252525"
      secondaryColor="#212121"
    >
      <rect x="2" y="-36" rx="5" ry="5" width={width} height={height} />
    </ContentLoader>
  );
};

export function ComicItem({ comicID, cover, name, latest }: ComicItemProps) {
  if (false) {
    // if (comicID) {
    return (
      <Link to={`/comic/${comicID}`} className="comic-item">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${cover.replace(/\/[m|b|c]\//, '/h/')})`
          }}
        />
        <div className="caption">
          <div className="name">{name}</div>
          <div className="latest">{latest}</div>
        </div>
      </Link>
    );
  }

  return <PlaceHodler />;
}
