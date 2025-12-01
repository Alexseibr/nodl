import React from 'react';

type PortfolioGridProps = {
  photos: string[];
};

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ photos }) => {
  if (!photos.length) {
    return null;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo}
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            background: '#f5f5f5',
            height: 120,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <img
            src={photo}
            alt="portfolio"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
