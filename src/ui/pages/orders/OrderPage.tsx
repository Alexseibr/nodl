import React from 'react';
import WorkerCard from '../../components/workers/WorkerCard';
import RecommendedWorkers from '../../components/workers/RecommendedWorkers';

const accentColor = '#6f5bce';

const orderPhotos = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=600&q=80',
];

const assignedWorker = {
  avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80',
  name: 'Иван Петров',
  categories: ['Электрик'],
  rating: 4.9,
  reviews: 25,
  priceFrom: '40 BYN',
  distance: '1.2 км',
  tags: ['Срочно'],
};

const recommendedWorkers = [assignedWorker];
const topRated = [
  {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    name: 'Екатерина Павлова',
    categories: ['Ремонт квартир'],
    rating: 5,
    reviews: 54,
    priceFrom: '55 BYN',
    distance: '3 км',
    tags: ['Топ рейтинг'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=120&q=80',
    name: 'Павел Кушнир',
    categories: ['Сантехник'],
    rating: 4.9,
    reviews: 48,
    priceFrom: '45 BYN',
    distance: '2.4 км',
    tags: ['Рекомендации'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    name: 'Ольга Левченко',
    categories: ['Уборка'],
    rating: 4.95,
    reviews: 62,
    priceFrom: '30 BYN',
    distance: '1.5 км',
    tags: ['Чистота'],
  },
];

export const OrderPage: React.FC = () => {
  return (
    <div style={{ padding: 16, background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Установить розетки в комнате</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', color: '#444', fontSize: 13 }}>
          <span style={{ fontWeight: 700 }}>150 BYN</span>
          <span style={{ color: '#999' }}>•</span>
          <span>Срок: завтра</span>
          <span style={{ color: '#999' }}>•</span>
          <span>Минск, 1.2 км</span>
        </div>

        <div style={{ color: '#444', lineHeight: 1.6 }}>
          Нужно установить 4 розетки в новой квартире. Провода подведены, требуется аккуратный монтаж и проверка. Желательно
          сегодня вечером или завтра утром.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {orderPhotos.map((photo) => (
            <div key={photo} style={{ borderRadius: 12, overflow: 'hidden', height: 120, background: '#f5f5f5' }}>
              <img src={photo} alt="order" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Назначенный мастер</div>
        <WorkerCard {...assignedWorker} />
        <button
          type="button"
          style={{
            padding: '12px 16px',
            borderRadius: 14,
            border: '1px solid transparent',
            background: accentColor,
            color: '#fff',
            fontWeight: 700,
            maxWidth: 200,
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(111,91,206,0.3)',
          }}
        >
          Открыть чат
        </button>
      </div>

      <RecommendedWorkers title="Подходящие мастера" nearby={recommendedWorkers} topRated={topRated} />
    </div>
  );
};

export default OrderPage;
