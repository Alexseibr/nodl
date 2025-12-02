import React from 'react';

type Props = {
  onPriority: () => void;
  available?: number;
};

export const PriorityButton: React.FC<Props> = ({ onPriority, available }) => {
  return (
    <button className="bids-priority" onClick={onPriority}>
      🏆 Приоритет {typeof available === 'number' ? `(осталось ${available})` : ''}
    </button>
  );
};
