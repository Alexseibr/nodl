import { useEffect, useState } from 'react';
import { adsApi } from '../api/adsApi';

export const useAdsSearch = (params: Record<string, unknown>) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    adsApi
      .searchAds(params)
      .then((res) => setData(res?.items || res))
      .finally(() => setLoading(false));
  }, [JSON.stringify(params)]);

  return { data, loading };
};
