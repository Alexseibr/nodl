import React from 'react';
import { WorkerCard } from './workerPage';

const mockWorkers = [
  {
    id: 'w1',
    name: 'Алексей П.',
    avatar: 'https://placekitten.com/120/120',
    categories: ['электрик', 'монтаж щитов'],
    rating: 4.9,
    reviewsCount: 25,
    priceFrom: 40,
    priceTo: 55,
    distanceKm: 1.2,
    tags: ['быстро', 'качество'],
  },
  {
    id: 'w2',
    name: 'Мария К.',
    avatar: 'https://placekitten.com/121/121',
    categories: ['сантехник'],
    rating: 4.8,
    reviewsCount: 40,
    priceFrom: 35,
    priceTo: 50,
    distanceKm: 3.5,
    tags: ['аккуратно', 'недорого'],
  },
];

export default function WorkersIndexPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Исполнители</h1>
      <p>Найдите мастера для любой задачи: ремонт, отделка, электрика, сантехника.</p>
      <div style={{ display: 'grid', gap: '12px' }}>
        {mockWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} actionLabel="Подробнее" />
        ))}
      </div>
    </div>
  );
}
