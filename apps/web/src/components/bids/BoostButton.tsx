import React from 'react';

type Props = {
  onBoost: () => void;
  available?: number;
};

export const BoostButton: React.FC<Props> = ({ onBoost, available }) => {
  return (
    <button className="bids-boost" onClick={onBoost}>
      🚀 Поднять отклик {typeof available === 'number' ? `(осталось ${available})` : ''}
    </button>
  );
};
