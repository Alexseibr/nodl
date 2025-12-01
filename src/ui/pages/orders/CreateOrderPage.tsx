import React, { useState } from 'react';

const accentColor = '#6f5bce';

export const CreateOrderPage: React.FC = () => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ padding: 16, background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Создать заказ</div>
      <div
        style={{
          background: '#fff',
          padding: 16,
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: 720,
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Что нужно сделать?</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Опишите задачу"
            rows={4}
            style={{
              borderRadius: 12,
              border: '1px solid #e6e6e6',
              padding: 12,
              fontSize: 14,
              resize: 'vertical',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Категория</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Например, электрика"
            style={{
              borderRadius: 12,
              border: '1px solid #e6e6e6',
              padding: 12,
              fontSize: 14,
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Бюджет</span>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Например, 150 BYN"
            style={{
              borderRadius: 12,
              border: '1px solid #e6e6e6',
              padding: 12,
              fontSize: 14,
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Адрес</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Укажите район или улицу"
            style={{
              borderRadius: 12,
              border: '1px solid #e6e6e6',
              padding: 12,
              fontSize: 14,
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Дата</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              borderRadius: 12,
              border: '1px solid #e6e6e6',
              padding: 12,
              fontSize: 14,
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Фото</span>
          <input type="file" multiple style={{ fontSize: 13 }} />
        </label>

        <button
          type="button"
          style={{
            marginTop: 8,
            padding: '14px 16px',
            borderRadius: 16,
            border: 'none',
            background: accentColor,
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(111,91,206,0.3)',
            maxWidth: 240,
          }}
        >
          Опубликовать заказ
        </button>
      </div>
    </div>
  );
};

export default CreateOrderPage;
