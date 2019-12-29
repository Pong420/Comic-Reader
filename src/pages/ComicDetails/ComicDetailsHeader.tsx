import React, { useMemo } from 'react';
import { Schema$ComicDetails } from '../../typings';

const ComicInfoItem = React.memo(
  ({ label, val }: { label: string; val: string }) => {
    const html = useMemo(() => ({ __html: val }), [val]);

    return (
      <div className="comic-info-item">
        <span>{label}</span>
        <span>：</span>
        <span dangerouslySetInnerHTML={html} />
      </div>
    );
  }
);

export const ComicDetailsHeader = React.memo(
  ({
    cover = '',
    intro = '',
    title = [],
    details = {}
  }: Partial<Schema$ComicDetails>) => {
    return (
      <div className="comic-details-header">
        <div className="comic-cover">
          <img src={cover} alt="" />
        </div>

        <div className="comic-info">
          <div className="comic-title">
            <h1>{title[0]}</h1>
            <h2>{title[1]}</h2>
          </div>

          <div className="comic-info-items">
            {Object.entries(details).map(([key, val]) => (
              <ComicInfoItem key={key} label={key} val={val} />
            ))}
          </div>

          <div className="comic-intro">{intro}</div>
        </div>
      </div>
    );
  }
);
