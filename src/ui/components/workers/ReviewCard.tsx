import React from 'react';

type ReviewCardProps = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ author, rating, date, text }) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 600, color: '#111' }}>{author}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#444', fontSize: 13 }}>
          <span aria-label="rating" role="img">⭐</span>
          <span>{rating.toFixed(1)}</span>
          <span style={{ color: '#999' }}>•</span>
          <span style={{ color: '#666' }}>{date}</span>
        </div>
      </div>
      <div style={{ color: '#444', fontSize: 13, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
};

export default ReviewCard;
