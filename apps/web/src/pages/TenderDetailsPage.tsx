import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tendersApi } from '../api/tendersApi';

export const TenderDetailsPage = () => {
  const { id } = useParams();
  const [tender, setTender] = useState<any>();

  useEffect(() => {
    if (id) tendersApi.get(id).then(setTender);
  }, [id]);

  if (!tender) return <p>Loading...</p>;

  return (
    <div className="card">
      <h1>{tender.title?.ru || tender.title}</h1>
      <p>{tender.description?.ru || tender.description}</p>
    </div>
  );
};
