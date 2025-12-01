import React from 'react';

type OrderCardProps = {
  title: string;
  description?: string;
  budget: string;
  address: string;
  distance?: string;
  date: string;
  photos?: string[];
};

const mutedText = '#666';

export const OrderCard: React.FC<OrderCardProps> = ({
  title,
  description,
  budget,
  address,
  distance,
  date,
  photos = [],
}) => {
  return (
    <div
      style={{
        background: '#fff',
        padding: 16,
        borderRadius: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4 }}>{title}</div>
        {description && (
          <div style={{ fontSize: 12, color: mutedText, lineHeight: 1.5, maxHeight: 42, overflow: 'hidden' }}>
            {description}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#333', fontSize: 13 }}>
        <span style={{ fontWeight: 700 }}>{budget}</span>
        <span style={{ color: '#999' }}>•</span>
        <span style={{ color: mutedText }}>Срок: {date}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: mutedText, fontSize: 13 }}>
        <span aria-label="location" role="img">📍</span>
        <span>
          {address}
          {distance ? ` • ${distance}` : ''}
        </span>
      </div>

      {photos.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {photos.slice(0, 2).map((photo, index) => (
            <div
              key={photo}
              style={{
                flex: 1,
                height: 72,
                borderRadius: 12,
                overflow: 'hidden',
                background: '#f2f2f2',
              }}
            >
              <img
                src={photo}
                alt={`order-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
