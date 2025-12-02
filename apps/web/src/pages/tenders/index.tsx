import React, { useEffect, useState } from 'react';
import { getTenders } from '../../api/tendersApi';
import { TendersList, TenderListItem } from '../../components/tenders/TendersList';

const TendersPage: React.FC = () => {
  const [tenders, setTenders] = useState<TenderListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTenders = async (filters: Record<string, string> = {}) => {
    setLoading(true);
    const data = await getTenders(filters);
    setTenders(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadTenders();
  }, []);

  return (
    <div>
      <h1>Доступные тендеры</h1>
      {loading ? <p>Загрузка...</p> : <TendersList tenders={tenders} onFilterChange={loadTenders} />}
    </div>
  );
};

export default TendersPage;
