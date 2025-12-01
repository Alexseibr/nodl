import React from 'react';

type WorkerCardProps = {
  avatar: string;
  name: string;
  categories: string[];
  rating: number;
  reviews?: number;
  priceFrom: string;
  distance?: string;
  tags?: string[];
  compact?: boolean;
};

const accentColor = '#6f5bce';

export const WorkerCard: React.FC<WorkerCardProps> = ({
  avatar,
  name,
  categories,
  rating,
  reviews,
  priceFrom,
  distance,
  tags = [],
  compact = false,
}) => {
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    gap: 12,
    padding: compact ? 12 : 16,
    borderRadius: 14,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    alignItems: 'center',
    minHeight: compact ? 84 : 98,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    cursor: 'pointer',
  };

  const avatarStyle: React.CSSProperties = {
    width: compact ? 48 : 56,
    height: compact ? 48 : 56,
    borderRadius: '50%',
    objectFit: 'cover',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 600,
    margin: 0,
    color: '#111',
  };

  const categoriesStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#666',
    margin: '4px 0',
    lineHeight: 1.4,
  };

  const pillStyle: React.CSSProperties = {
    background: '#f3f3f3',
    borderRadius: 14,
    padding: '4px 10px',
    fontSize: 12,
    color: '#444',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <img src={avatar} alt={name} style={avatarStyle} />
      <div style={{ flex: 1 }}>
        <p style={nameStyle}>{name}</p>
        <p style={categoriesStyle}>{categories.slice(0, 2).join(' • ')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#444', fontSize: 13 }}>
          <span aria-label="rating" role="img">⭐</span>
          <span>
            {rating.toFixed(1)} {reviews ? `(${reviews})` : ''}
          </span>
          {distance && <span style={{ opacity: 0.6 }}>• {distance}</span>}
        </div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, color: '#111' }}>от {priceFrom}</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} style={{ ...pillStyle, color: accentColor, background: '#f4f1ff' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
