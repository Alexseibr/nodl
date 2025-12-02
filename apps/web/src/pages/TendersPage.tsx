import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tendersApi } from '../api/tendersApi';

export const TendersPage = () => {
  const [tenders, setTenders] = useState<any[]>([]);

  useEffect(() => {
    tendersApi.list().then((data) => setTenders(data.items || data));
  }, []);

  return (
    <div>
      <h1>Tenders</h1>
      {tenders.map((tender) => (
        <div key={tender._id} className="card">
          <h3>{tender.title?.ru || tender.title}</h3>
          <p>{tender.description?.ru || tender.description}</p>
          <Link to={`/tenders/${tender._id}`}>Open</Link>
        </div>
      ))}
    </div>
  );
};
