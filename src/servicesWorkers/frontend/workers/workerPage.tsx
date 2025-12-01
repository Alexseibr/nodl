import React from 'react';

type WorkerCardProps = {
  worker: {
    id: string;
    name: string;
    avatar?: string;
    categories: string[];
    rating: number;
    reviewsCount: number;
    priceFrom?: number;
    priceTo?: number;
    distanceKm?: number;
    tags?: string[];
    description?: string;
  };
  actionLabel?: string;
};

export function WorkerCard({ worker, actionLabel = 'Откликнуться' }: WorkerCardProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 120px',
        gap: '12px',
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #eee',
        background: '#fff',
      }}
    >
      <img
        src={worker.avatar}
        alt={worker.name}
        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
      />
      <div>
        <h3 style={{ margin: '4px 0' }}>{worker.name}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {worker.categories.map((category) => (
            <span key={category} style={chipStyle}>
              {category}
            </span>
          ))}
        </div>
        <p style={{ margin: '4px 0', color: '#555' }}>
          ⭐ {worker.rating} ({worker.reviewsCount} отзывов) · от {worker.priceFrom} BYN / час
          {worker.distanceKm ? ` · ${worker.distanceKm.toFixed(1)} км` : ''}
        </p>
        {worker.tags && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {worker.tags.map((tag) => (
              <span key={tag} style={{ ...chipStyle, background: '#f0f4ff', color: '#2b53ff' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <button style={buttonStyle}>{actionLabel}</button>
      </div>
    </div>
  );
}

export default function WorkerPage() {
  const worker = {
    id: 'w1',
    name: 'Алексей Плотников',
    avatar: 'https://placekitten.com/140/140',
    categories: ['укладка плитки', 'демонтаж'],
    rating: 4.9,
    reviewsCount: 25,
    priceFrom: 40,
    priceTo: 60,
    distanceKm: 1.2,
    tags: ['бригада', 'быстро', 'качество'],
    description:
      'Опыт 8 лет. Делаю плитку, ремонт ванной, демонтаж старой отделки, укладка ламината и подготовка стен.',
  };
  const portfolio = [
    { title: 'Ванная под ключ', mediaUrl: 'https://placekitten.com/320/180' },
    { title: 'Укладка плитки', mediaUrl: 'https://placekitten.com/321/180' },
  ];

  return (
    <div style={{ padding: '24px', display: 'grid', gap: '16px' }}>
      <WorkerCard worker={worker} actionLabel="Написать" />
      <p style={{ margin: 0, color: '#444' }}>{worker.description}</p>
      <div>
        <h4>Портфолио</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {portfolio.map((item) => (
            <figure key={item.title} style={{ margin: 0 }}>
              <img
                src={item.mediaUrl}
                alt={item.title}
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
              />
              <figcaption style={{ marginTop: '6px', color: '#555' }}>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

const chipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  borderRadius: '999px',
  background: '#f6f7f9',
  color: '#333',
  fontSize: '12px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid #2b53ff',
  background: '#2b53ff',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
};
