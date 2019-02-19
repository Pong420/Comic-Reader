import React, { useState } from 'react';

export interface HomeHeaderPorps {
  tabs: string[];
  onChange?: (label: string) => void;
}

export function HomeHeader({ tabs, onChange }: HomeHeaderPorps) {
  const [active, setActive] = useState(0);

  return (
    <div className="home-header">
      {tabs.map((label, index) => (
        <div
          className={`home-header-tab ${index === active ? 'active' : ''}`}
          key={index}
          onClick={() => {
            setActive(index);
            onChange(label);
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
