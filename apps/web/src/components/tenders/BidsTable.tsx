import React from 'react';

export interface BidTableRow {
  id: string;
  contractorName: string;
  contractorType: string;
  rating?: number;
  price: number;
  currency: string;
  estimatedDurationDays: number;
  canStartFrom: string;
  warrantyMonths?: number | null;
  includesMaterials: boolean;
  comment?: string;
  status: string;
}

interface Props {
  bids: BidTableRow[];
  onShortlist?: (bidId: string) => void;
  onAccept?: (bidId: string) => void;
}

export const BidsTable: React.FC<Props> = ({ bids, onShortlist, onAccept }) => {
  return (
    <table className="bids-table">
      <thead>
        <tr>
          <th>Исполнитель</th>
          <th>Цена</th>
          <th>Срок</th>
          <th>Старт</th>
          <th>Гарантия</th>
          <th>Материалы</th>
          <th>Комментарий</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {bids.map((bid) => (
          <tr key={bid.id} className={bid.status === 'accepted' ? 'accepted' : ''}>
            <td>
              <div>
                <strong>{bid.contractorName}</strong>
                <div>
                  {bid.contractorType} {bid.rating ? `· ⭐ ${bid.rating.toFixed(1)}` : ''}
                </div>
              </div>
            </td>
            <td>
              {bid.price} {bid.currency}
            </td>
            <td>{bid.estimatedDurationDays} дн.</td>
            <td>{new Date(bid.canStartFrom).toLocaleDateString()}</td>
            <td>{bid.warrantyMonths ?? '—'}</td>
            <td>{bid.includesMaterials ? 'Да' : 'Нет'}</td>
            <td>{bid.comment ?? ''}</td>
            <td>{bid.status}</td>
            <td>
              <button onClick={() => onShortlist?.(bid.id)}>Шорт-лист</button>
              <button onClick={() => onAccept?.(bid.id)}>Выбрать</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
