import React, { useMemo, useState } from 'react';
import WorkerCard from '../../components/workers/WorkerCard';
import WorkerFilterBar from '../../components/filters/WorkerFilterBar';

type Worker = {
  avatar: string;
  name: string;
  categories: string[];
  rating: number;
  reviews: number;
  priceFrom: string;
  distance: string;
  tags: string[];
};

const filters = ['Категория', 'Район', 'Цена', 'Расстояние', 'Рейтинг', 'Онлайн'];

const mockWorkers: Worker[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80',
    name: 'Андрей Ковалев',
    categories: ['Электрик', 'Умный дом'],
    rating: 4.9,
    reviews: 25,
    priceFrom: '40 BYN',
    distance: '1.2 км',
    tags: ['Срочный выезд', 'Гарантия'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    name: 'Мария Иванова',
    categories: ['Уборка', 'Глажка'],
    rating: 4.8,
    reviews: 41,
    priceFrom: '35 BYN',
    distance: '0.8 км',
    tags: ['Опыт 5 лет', 'Эко-средства'],
  },
  {
    avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=120&q=80',
    name: 'Денис Бондарь',
    categories: ['Сантехник', 'Отопление'],
    rating: 4.7,
    reviews: 32,
    priceFrom: '45 BYN',
    distance: '2.1 км',
    tags: ['24/7', 'Запчасти'],
  },
];

export const WorkersListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('');

  const filteredWorkers = useMemo(() => {
    const bySearch = mockWorkers.filter((worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.categories.some((category) => category.toLowerCase().includes(search.toLowerCase())),
    );

    if (!activeFilter) {
      return bySearch;
    }

    return bySearch.filter(() => true);
  }, [search, activeFilter]);

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, background: '#fafafa' }}>
      <WorkerFilterBar
        filters={filters.map((label) => ({ label, active: activeFilter === label }))}
        onSelect={(label) => setActiveFilter((prev) => (prev === label ? '' : label))}
      />

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Штукатур, электрик..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 16,
            border: '1px solid #e6e6e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}
      >
        {filteredWorkers.map((worker) => (
          <WorkerCard key={worker.name} {...worker} />
        ))}
      </div>
    </div>
  );
};

export default WorkersListPage;
