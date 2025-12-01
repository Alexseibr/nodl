import React, { useState } from 'react';

export default function CreateWorkerPage() {
  const [form, setForm] = useState({
    name: '',
    categories: '',
    city: '',
    priceFrom: '',
    priceTo: '',
    description: '',
  });

  return (
    <div style={{ padding: '24px', maxWidth: 720 }}>
      <h1>Анкета исполнителя</h1>
      <p>Заполните данные, чтобы получать заказы и участвовать в тендерах.</p>
      <form style={{ display: 'grid', gap: '12px' }}>
        <label style={labelStyle}>
          Имя и фамилия
          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Иван Иванов"
          />
        </label>
        <label style={labelStyle}>
          Категории (через запятую)
          <input
            style={inputStyle}
            value={form.categories}
            onChange={(e) => setForm({ ...form, categories: e.target.value })}
            placeholder="электрик, сантехник"
          />
        </label>
        <label style={labelStyle}>
          Город
          <input
            style={inputStyle}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Минск"
          />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <label style={labelStyle}>
            Цена от (BYN/час)
            <input
              style={inputStyle}
              value={form.priceFrom}
              onChange={(e) => setForm({ ...form, priceFrom: e.target.value })}
              placeholder="35"
            />
          </label>
          <label style={labelStyle}>
            Цена до (BYN/час)
            <input
              style={inputStyle}
              value={form.priceTo}
              onChange={(e) => setForm({ ...form, priceTo: e.target.value })}
              placeholder="60"
            />
          </label>
        </div>
        <label style={labelStyle}>
          Описание опыта
          <textarea
            style={{ ...inputStyle, minHeight: 120 }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Опыт 5 лет, делаю электрику и сантехнику под ключ"
          />
        </label>
        <button type="button" style={submitStyle}>
          Сохранить анкету
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'grid',
  gap: '4px',
  fontWeight: 600,
  color: '#333',
};

const inputStyle: React.CSSProperties = {
  border: '1px solid #e2e3e8',
  padding: '10px 12px',
  borderRadius: '10px',
  fontSize: '14px',
  width: '100%',
};

const submitStyle: React.CSSProperties = {
  marginTop: '12px',
  padding: '12px 16px',
  borderRadius: '12px',
  border: 'none',
  background: '#2b53ff',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 700,
};
