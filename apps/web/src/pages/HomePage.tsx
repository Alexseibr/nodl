import { useState } from 'react';
import { useAdsSearch } from '../hooks/useAdsSearch';
import { T } from '../components/common/T';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [query, setQuery] = useState('');
  const { data: ads, loading } = useAdsSearch({ q: query });

  return (
    <div>
      <h1><T id="home.title" /></h1>
      <div className="card">
        <input placeholder={"Search"} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {loading && <p>Loading...</p>}
      {ads.map((ad: any) => (
        <div key={ad._id} className="card">
          <h3>{ad.title?.ru || ad.title}</h3>
          <p>{ad.description?.ru || ad.description}</p>
          <Link to={`/ads/${ad._id}`}>Open</Link>
        </div>
      ))}
      <Link to="/ads/create">
        <button className="primary"><T id="ads.create.title" /></button>
      </Link>
    </div>
  );
};
