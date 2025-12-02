import React from 'react';

type Props = {
  onHighlight: () => void;
  available?: number;
};

export const HighlightButton: React.FC<Props> = ({ onHighlight, available }) => {
  return (
    <button className="bids-highlight" onClick={onHighlight}>
      ✨ Выделить отклик {typeof available === 'number' ? `(осталось ${available})` : ''}
    </button>
  );
};
