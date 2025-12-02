import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storesApi } from '../api/storesApi';

export const StoresPage = () => {
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    storesApi.list().then((data) => setStores(data.items || data));
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      {stores.map((store) => (
        <div key={store._id} className="card">
          <h3>{store.title?.ru || store.title}</h3>
          <p>{store.description?.ru || store.description}</p>
          <Link to={`/stores/${store._id}`}>Open</Link>
        </div>
      ))}
    </div>
  );
};
