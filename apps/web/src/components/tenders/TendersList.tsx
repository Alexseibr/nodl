import React from 'react';

export interface TenderListItem {
  id: string;
  title: string;
  city: string;
  category: string;
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  bidsCount?: number;
  publishedAt?: string;
}

interface Props {
  tenders: TenderListItem[];
  onFilterChange?: (filters: Record<string, string>) => void;
}

export const TendersList: React.FC<Props> = ({ tenders, onFilterChange }) => {
  return (
    <div className="tenders-list">
      <div className="filters">
        <input placeholder="Город" onChange={(e) => onFilterChange?.({ city: e.target.value })} />
        <input placeholder="Категория" onChange={(e) => onFilterChange?.({ category: e.target.value })} />
        <input placeholder="Бюджет от" onChange={(e) => onFilterChange?.({ budgetMin: e.target.value })} />
        <input placeholder="Бюджет до" onChange={(e) => onFilterChange?.({ budgetMax: e.target.value })} />
      </div>
      <ul>
        {tenders.map((tender) => (
          <li key={tender.id} className="tender-card">
            <div className="tender-card__header">
              <h3>{tender.title}</h3>
              {tender.publishedAt && <span>{new Date(tender.publishedAt).toLocaleDateString()}</span>}
            </div>
            <p className="tender-card__meta">
              {tender.city} · {tender.category}
            </p>
            <p>{tender.description.slice(0, 120)}...</p>
            <p>
              Бюджет: {tender.budgetMin ?? '—'} - {tender.budgetMax ?? '—'} {tender.currency}
            </p>
            <p>Откликов: {tender.bidsCount ?? 0}</p>
            <a href={`/tenders/${tender.id}`}>Подробнее</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
