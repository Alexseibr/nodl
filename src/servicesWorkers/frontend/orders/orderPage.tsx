import React from 'react';
import { WorkerCard } from '../workers/workerPage';

const order = {
  id: 'o1',
  title: 'Положить плитку в ванной',
  budget: 150,
  deadline: 'завтра',
  address: 'ул. Победителей 10',
  distanceKm: 2.1,
  photos: ['https://placekitten.com/360/200'],
  description: 'Нужно уложить плитку 12м², подготовить стены и сделать гидроизоляцию.',
};

const responses = [
  {
    id: 'r1',
    worker: {
      id: 'w1',
      name: 'Алексей П.',
      avatar: 'https://placekitten.com/122/122',
      categories: ['плиточник'],
      rating: 4.9,
      reviewsCount: 25,
      priceFrom: 40,
      distanceKm: 1.2,
      tags: ['быстро', 'качество'],
    },
    message: 'Могу завтра, материал ваш. Сделаю за 140 BYN.',
    status: 'pending',
  },
];

export default function OrderPage() {
  return (
    <div style={{ padding: '24px', display: 'grid', gap: '16px' }}>
      <div style={card}>
        <h2>{order.title}</h2>
        <p style={{ color: '#444' }}>{order.description}</p>
        <p style={{ margin: '6px 0' }}>
          Бюджет: <strong>{order.budget} BYN</strong> · Срок: {order.deadline} · Адрес: {order.address} ·
          {order.distanceKm} км
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {order.photos.map((src) => (
            <img key={src} src={src} alt="order" style={{ width: 160, borderRadius: '12px' }} />
          ))}
        </div>
        <button style={primaryBtn}>Откликнуться</button>
      </div>

      <div style={card}>
        <h3>Отклики</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {responses.map((response) => (
            <div key={response.id} style={{ border: '1px solid #f0f0f0', borderRadius: '12px', padding: '12px' }}>
              <WorkerCard worker={response.worker} actionLabel="Принять" />
              <p style={{ margin: '8px 0', color: '#444' }}>{response.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #eaeaea',
  borderRadius: '12px',
  padding: '16px',
};

const primaryBtn: React.CSSProperties = {
  marginTop: '12px',
  padding: '12px 16px',
  borderRadius: '12px',
  background: '#2b53ff',
  border: 'none',
  color: '#fff',
  fontWeight: 700,
};
