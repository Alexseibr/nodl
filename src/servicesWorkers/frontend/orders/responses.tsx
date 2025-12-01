import React from 'react';
import { WorkerCard } from '../workers/workerPage';

const responses = [
  {
    id: 'r1',
    priceOffer: 140,
    message: 'Сделаю за 140 BYN, материалы ваши. Два дня работы.',
    status: 'pending',
    worker: {
      id: 'w1',
      name: 'Алексей П.',
      avatar: 'https://placekitten.com/123/123',
      categories: ['плиточник'],
      rating: 4.9,
      reviewsCount: 25,
      priceFrom: 40,
      distanceKm: 1.2,
      tags: ['быстро', 'бригада'],
    },
  },
  {
    id: 'r2',
    priceOffer: 155,
    message: 'Привезу плиткорез и клей, сделаю аккуратно. 1 день.',
    status: 'accepted',
    worker: {
      id: 'w2',
      name: 'Сергей М.',
      avatar: 'https://placekitten.com/124/124',
      categories: ['плиточник', 'отделка'],
      rating: 4.7,
      reviewsCount: 31,
      priceFrom: 45,
      distanceKm: 2.4,
      tags: ['качество'],
    },
  },
];

export default function OrderResponsesPage() {
  return (
    <div style={{ padding: '24px', display: 'grid', gap: '12px' }}>
      <h2>Отклики на заказ</h2>
      {responses.map((response) => (
        <div key={response.id} style={responseCard(response.status)}>
          <WorkerCard worker={response.worker} actionLabel={response.status === 'accepted' ? 'В работе' : 'Назначить'} />
          <p style={{ margin: '8px 0', color: '#444' }}>
            Предложение: <strong>{response.priceOffer} BYN</strong>
          </p>
          <p style={{ margin: '4px 0', color: '#555' }}>{response.message}</p>
        </div>
      ))}
    </div>
  );
}

const responseCard = (status: string): React.CSSProperties => ({
  border: '1px solid #eaeaea',
  borderRadius: '12px',
  padding: '12px',
  background: status === 'accepted' ? '#f0fff6' : '#fff',
});
