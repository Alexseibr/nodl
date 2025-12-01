import React from 'react';

type FilterChip = {
  label: string;
  active?: boolean;
};

type WorkerFilterBarProps = {
  filters: FilterChip[];
  onSelect?: (label: string) => void;
};

const chipBaseStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 16,
  background: '#f3f3f3',
  color: '#333',
  border: '1px solid transparent',
  fontSize: 13,
  whiteSpace: 'nowrap',
};

const accentColor = '#6f5bce';

export const WorkerFilterBar: React.FC<WorkerFilterBarProps> = ({ filters, onSelect }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        overflowX: 'auto',
        padding: '8px 0',
      }}
    >
      {filters.map((filter) => {
        const isActive = filter.active;
        return (
          <button
            key={filter.label}
            type="button"
            style={{
              ...chipBaseStyle,
              cursor: 'pointer',
              borderColor: isActive ? accentColor : 'transparent',
              color: isActive ? accentColor : '#333',
              background: isActive ? '#f4f1ff' : '#f3f3f3',
            }}
            onClick={() => onSelect?.(filter.label)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default WorkerFilterBar;
