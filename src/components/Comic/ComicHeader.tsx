import React, { useMemo } from 'react';
import { Schema$ComicData } from '../../typings';

const DetailsItem = React.memo(
  ({ label, val }: { label: string; val: string }) => {
    const html = useMemo(() => ({ __html: val }), [val]);

    return (
      <div className="comic-details-item">
        <span>{label}</span>
        <span>：</span>
        <span dangerouslySetInnerHTML={html} />
      </div>
    );
  }
);

export const ComicHeader = React.memo(
  ({
    cover = '',
    intro = '',
    title = [],
    details = {}
  }: Partial<Schema$ComicData>) => {
    const coverStyle = useMemo(() => ({ backgroundImage: `url(${cover})` }), [
      cover
    ]);

    return (
      <div className="comic-header">
        <div className="comic-cover">
          <div style={coverStyle} />
        </div>

        <div className="comic-info">
          <div className="comic-title">
            <h1>{title[0]}</h1>
            <h2>{title[1]}</h2>
          </div>

          <div className="comic-details">
            {Object.entries(details).map(([key, val]) => (
              <DetailsItem key={key} label={key} val={val} />
            ))}
          </div>

          <div className="comic-intro">{intro}</div>
        </div>
      </div>
    );
  }
);
