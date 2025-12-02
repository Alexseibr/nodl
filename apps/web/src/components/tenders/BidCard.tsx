import React from 'react';

export interface BidCardProps {
  contractorName: string;
  contractorType: string;
  rating?: number;
  price: number;
  currency: string;
  estimatedDurationDays: number;
  canStartFrom: string;
  includesMaterials: boolean;
  warrantyMonths?: number | null;
  comment?: string;
  status: string;
  onShortlist?: () => void;
  onAccept?: () => void;
}

export const BidCard: React.FC<BidCardProps> = ({
  contractorName,
  contractorType,
  rating,
  price,
  currency,
  estimatedDurationDays,
  canStartFrom,
  includesMaterials,
  warrantyMonths,
  comment,
  status,
  onShortlist,
  onAccept,
}) => {
  return (
    <div className="bid-card">
      <div className="bid-card__header">
        <h4>
          {contractorName} · {contractorType}
        </h4>
        {rating && <span>⭐ {rating.toFixed(1)}</span>}
      </div>
      <p>
        Цена: {price} {currency}
      </p>
      <p>Срок: {estimatedDurationDays} дней</p>
      <p>Старт с: {new Date(canStartFrom).toLocaleDateString()}</p>
      <p>Материалы: {includesMaterials ? 'включены' : 'не включены'}</p>
      <p>Гарантия: {warrantyMonths ?? '—'} мес.</p>
      {comment && <p className="comment">Комментарий: {comment}</p>}
      <p>Статус: {status}</p>
      <div className="actions">
        <button onClick={onShortlist}>В шорт-лист</button>
        <button onClick={onAccept}>Выбрать исполнителя</button>
      </div>
    </div>
  );
};
