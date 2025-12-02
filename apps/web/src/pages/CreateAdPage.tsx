import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adsApi } from '../api/adsApi';

export const CreateAdPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    const payload = {
      title: { ru: title },
      description: { ru: description },
      price: { amount: Number(price), currency: 'EUR' },
      categoryId,
      location: { lat: 0, lng: 0 },
    };
    const ad = await adsApi.createAd(payload);
    navigate(`/ads/${ad._id}`);
  };

  return (
    <div className="card">
      <h1>Create Ad</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <input placeholder="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      <button className="primary" onClick={submit}>Publish</button>
    </div>
  );
};
