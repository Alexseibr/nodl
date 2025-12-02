import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createTender } from '../../api/tendersApi';

export const TenderForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    currency: 'BYN',
    addressText: '',
    lat: '',
    lng: '',
    deadlinePreferred: '',
    photos: [] as string[],
    publishNow: true,
    city: '',
    country: 'BY',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const payload = {
        ...form,
        budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
        budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined,
        lat: Number(form.lat) || 0,
        lng: Number(form.lng) || 0,
      } as any;
      const created = await createTender(payload);
      setStatus('success');
      if (payload.publishNow && created?.id) {
        router.push(`/tenders/${created.id}`);
      } else {
        router.push('/tenders');
      }
    } catch (err) {
      setError('Не удалось создать тендер');
      setStatus('error');
    }
  };

  return (
    <form className="tender-form" onSubmit={handleSubmit}>
      <h1>Создать тендер</h1>
      <label>
        Название работ
        <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
      </label>
      <label>
        Категория
        <input value={form.category} onChange={(e) => handleChange('category', e.target.value)} required />
      </label>
      <label>
        Описание задачи
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Опишите материалы, объем и особые условия"
          required
        />
      </label>
      <div className="budget-row">
        <label>
          Бюджет от
          <input
            type="number"
            value={form.budgetMin}
            onChange={(e) => handleChange('budgetMin', e.target.value)}
          />
        </label>
        <label>
          Бюджет до
          <input
            type="number"
            value={form.budgetMax}
            onChange={(e) => handleChange('budgetMax', e.target.value)}
          />
        </label>
        <label>
          Валюта
          <select value={form.currency} onChange={(e) => handleChange('currency', e.target.value)}>
            <option value="BYN">BYN</option>
            <option value="RUB">RUB</option>
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
      </div>
      <label>
        Адрес
        <input value={form.addressText} onChange={(e) => handleChange('addressText', e.target.value)} />
      </label>
      <div className="geo-row">
        <label>
          Широта
          <input value={form.lat} onChange={(e) => handleChange('lat', e.target.value)} />
        </label>
        <label>
          Долгота
          <input value={form.lng} onChange={(e) => handleChange('lng', e.target.value)} />
        </label>
        <button type="button" onClick={() => alert('TODO: определение по геолокации')}>
          Определить по геолокации
        </button>
      </div>
      <label>
        Город
        <input value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
      </label>
      <label>
        Страна
        <select value={form.country} onChange={(e) => handleChange('country', e.target.value)}>
          <option value="BY">Беларусь</option>
          <option value="RU">Россия</option>
          <option value="PL">Польша</option>
        </select>
      </label>
      <label>
        Желаемый срок окончания
        <input
          type="date"
          value={form.deadlinePreferred}
          onChange={(e) => handleChange('deadlinePreferred', e.target.value)}
        />
      </label>
      <label>
        Фотографии
        <input
          type="text"
          placeholder="Вставьте URL фото через запятую"
          onChange={(e) => handleChange('photos', e.target.value.split(',').map((item) => item.trim()))}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={form.publishNow}
          onChange={(e) => handleChange('publishNow', e.target.checked)}
        />
        Сразу опубликовать
      </label>

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Отправка...' : 'Создать тендер'}
      </button>
      {status === 'success' && <p className="success">Тендер успешно создан</p>}
      {status === 'error' && <p className="error">{error}</p>}
    </form>
  );
};
