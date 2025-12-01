import React from 'react';
import PortfolioGrid from '../../components/workers/PortfolioGrid';
import ReviewCard from '../../components/workers/ReviewCard';
import RecommendedWorkers from '../../components/workers/RecommendedWorkers';

const accentColor = '#6f5bce';

const portfolioPhotos = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
];

const reviews = [
  {
    author: 'Светлана',
    rating: 4.9,
    date: '3 дня назад',
    text: 'Быстро приехал, аккуратно все сделал. Объяснил, что нужно заменить в будущем. Рекомендую!'
  },
  {
    author: 'Олег',
    rating: 5.0,
    date: '1 неделя назад',
    text: 'Работа выполнена качественно, цену озвучил заранее. Буду обращаться еще.'
  }
];

const services = [
  { title: 'Диагностика электропроводки', price: 'от 35 BYN' },
  { title: 'Установка розеток и выключателей', price: 'от 40 BYN' },
  { title: 'Сборка щитка', price: 'от 60 BYN' },
];

const recommendedNearby = [
  {
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80',
    name: 'Андрей Ковалев',
    categories: ['Электрик'],
    rating: 4.9,
    reviews: 25,
    priceFrom: '40 BYN',
    distance: '1.2 км',
    tags: ['Срочно'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=120&q=80',
    name: 'Денис Бондарь',
    categories: ['Сантехник'],
    rating: 4.7,
    reviews: 32,
    priceFrom: '45 BYN',
    distance: '2.1 км',
    tags: ['24/7'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    name: 'Мария Иванова',
    categories: ['Уборка'],
    rating: 4.8,
    reviews: 41,
    priceFrom: '35 BYN',
    distance: '0.8 км',
    tags: ['Эко'],
  },
];

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
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    name: 'Ольга Левченко',
    categories: ['Уборка'],
    rating: 4.95,
    reviews: 62,
    priceFrom: '30 BYN',
    distance: '1.5 км',
    tags: ['Чистота'],
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
];

export const WorkerPage: React.FC = () => {
  return (
    <div style={{ padding: 16, background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80"
            alt="worker"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Иван Петров</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', color: '#666', fontSize: 13 }}>
              <span style={{ background: '#f4f1ff', padding: '4px 10px', borderRadius: 16, color: accentColor }}>Электрика</span>
              <span style={{ background: '#f4f1ff', padding: '4px 10px', borderRadius: 16, color: accentColor }}>Умный дом</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#444', fontSize: 13, marginTop: 4 }}>
              <span aria-label="rating" role="img">⭐</span>
              <span>4.9 (25 отзывов)</span>
              <span style={{ color: '#999' }}>•</span>
              <span>Минск, Советский район</span>
            </div>
            <div style={{ color: '#111', fontWeight: 700, marginTop: 6 }}>Цена: от 40 BYN</div>
          </div>
        </div>
      </div>

      <section style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>О мастере</div>
        <p style={{ margin: 0, color: '#444', lineHeight: 1.6 }}>
          Опытный мастер с 8-летней практикой. Помогу с ремонтом электрики в квартире и доме. Работаю аккуратно,
          приезжаю вовремя, гарантирую чистоту после работы.
        </p>
      </section>

      <section style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Услуги</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          {services.map((service) => (
            <div
              key={service.title}
              style={{
                padding: 12,
                borderRadius: 14,
                background: '#fafafa',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontWeight: 600, color: '#111', marginBottom: 6 }}>{service.title}</div>
              <div style={{ color: accentColor, fontWeight: 700 }}>{service.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Портфолио</div>
        <PortfolioGrid photos={portfolioPhotos} />
      </section>

      <section style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Отзывы</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reviews.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>
      </section>

      <RecommendedWorkers title="Подходящие мастера" nearby={recommendedNearby} topRated={topRated} />

      <div
        style={{
          position: 'sticky',
          bottom: 16,
          alignSelf: 'flex-end',
          marginTop: 12,
        }}
      >
        <button
          type="button"
          style={{
            padding: '14px 20px',
            borderRadius: 16,
            background: accentColor,
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            boxShadow: '0 6px 16px rgba(111,91,206,0.3)',
            cursor: 'pointer',
          }}
        >
          Связаться
        </button>
      </div>
    </div>
  );
};

export default WorkerPage;
