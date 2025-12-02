import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTenderById } from '../../api/tendersApi';
import { getBidsByTenderId, acceptBid, shortlistBid } from '../../api/bidsApi';
import { BidsTable, BidTableRow } from '../../components/tenders/BidsTable';

const TenderDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tender, setTender] = useState<any>(null);
  const [bids, setBids] = useState<BidTableRow[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const tenderData = await getTenderById(id as string);
      setTender(tenderData);
      const bidsData = await getBidsByTenderId(id as string);
      setBids(bidsData ?? []);
    })();
  }, [id]);

  const handleShortlist = async (bidId: string) => {
    await shortlistBid(id as string, bidId);
    const refreshed = await getBidsByTenderId(id as string);
    setBids(refreshed ?? []);
  };

  const handleAccept = async (bidId: string) => {
    await acceptBid(id as string, bidId);
    const refreshed = await getBidsByTenderId(id as string);
    setBids(refreshed ?? []);
  };

  if (!tender) return <p>Загрузка...</p>;

  return (
    <div className="tender-details">
      <section className="tender-details__info">
        <h1>{tender.title}</h1>
        <p>{tender.description}</p>
        <p>
          Бюджет: {tender.budgetMin ?? '—'} - {tender.budgetMax ?? '—'} {tender.currency}
        </p>
        <p>Срок: {tender.deadlinePreferred ? new Date(tender.deadlinePreferred).toLocaleDateString() : '—'}</p>
        <p>Адрес: {tender.addressText}</p>
        {tender.photos?.length ? (
          <div className="gallery">
            {tender.photos.map((photo: string) => (
              <img key={photo} src={photo} alt={tender.title} />
            ))}
          </div>
        ) : (
          <p>Фото пока нет</p>
        )}
      </section>

      <section className="tender-details__bids">
        <h2>Отклики</h2>
        <BidsTable bids={bids} onShortlist={handleShortlist} onAccept={handleAccept} />
      </section>
    </div>
  );
};

export default TenderDetailsPage;
