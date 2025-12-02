import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storesApi } from '../api/storesApi';

export const StoreDetailsPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState<any>();

  useEffect(() => {
    if (id) storesApi.get(id).then(setStore);
  }, [id]);

  if (!store) return <p>Loading...</p>;

  return (
    <div className="card">
      <h1>{store.title?.ru || store.title}</h1>
      <p>{store.description?.ru || store.description}</p>
    </div>
  );
};
