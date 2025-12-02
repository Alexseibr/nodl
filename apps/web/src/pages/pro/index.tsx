import React from 'react';
import { Plans } from '../../components/subscriptions/Plans';

const ProLanding: React.FC = () => {
  return (
    <div>
      <h1>PRO для мастеров</h1>
      <p>Получите больше откликов, приоритет и аналитику.</p>
      <Plans onSelect={(code) => (window.location.href = `/pro/checkout?plan=${code}`)} />
    </div>
  );
};

export default ProLanding;
