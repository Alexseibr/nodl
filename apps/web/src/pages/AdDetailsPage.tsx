import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { adsApi } from '../api/adsApi';
import { useAuth } from '../hooks/useAuth';

export const AdDetailsPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<any>();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      adsApi.getAd(id).then((data) => setAd(data));
      adsApi.viewAd(id);
    }
  }, [id]);

  if (!ad) return <p>Loading...</p>;

  return (
    <div className="card">
      <h1>{ad.title?.ru || ad.title}</h1>
      <p>{ad.description?.ru || ad.description}</p>
      <p><strong>Price:</strong> {ad.price?.values?.[ad.price?.baseCurrency] || ''} {ad.price?.baseCurrency}</p>
      <button className="primary" onClick={() => adsApi.setFavorite(id!, true)} disabled={!user}>Add to favorites</button>
    </div>
  );
};
