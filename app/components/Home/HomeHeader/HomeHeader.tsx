import React, { useState } from 'react';

export interface HomeHeaderPorps {
  tabs: string[];
  onChange?: (label: string) => void;
}

export function HomeHeader({ tabs, onChange }: HomeHeaderPorps) {
  const [active, setActive] = useState(0);

  return (
    <div className="home-header">
      {tabs.map((label, index) => {
        const isActive = index === active ? 'active' : '';
        return (
          <div
            key={index}
            className={`home-header-tab ${isActive}`}
            onClick={() => {
              setActive(index);
              onChange(label);
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
