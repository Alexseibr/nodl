import React from 'react';
import WorkerCard from './WorkerCard';

type RecommendedWorkersProps = {
  title: string;
  workers?: {
    avatar: string;
    name: string;
    categories: string[];
    rating: number;
    reviews?: number;
    priceFrom: string;
    distance?: string;
    tags?: string[];
  }[];
  nearby?: {
    avatar: string;
    name: string;
    categories: string[];
    rating: number;
    reviews?: number;
    priceFrom: string;
    distance?: string;
    tags?: string[];
  }[];
  }[];
  topRated?: {
    avatar: string;
    name: string;
    categories: string[];
    rating: number;
    reviews?: number;
    priceFrom: string;
    distance?: string;
    tags?: string[];
  }[];
};

const renderWorkerGrid = (workers: RecommendedWorkersProps['workers']) => {
  if (!workers || !workers.length) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
        {workers.map((worker) => (
          <WorkerCard key={worker.name} {...worker} compact />
        ))}
      </div>
    </div>
  );
};

export const RecommendedWorkers: React.FC<RecommendedWorkersProps> = ({ title, workers, nearby, topRated }) => {
  if (!workers?.length && !nearby?.length && !topRated?.length) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{title}</div>
      {renderWorkerGrid(nearby || workers)}
      {topRated && topRated.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, color: '#333' }}>Лучшие по рейтингу</div>
          {renderWorkerGrid(topRated)}
        </div>
      )}
    </div>
  );
};

export default RecommendedWorkers;
