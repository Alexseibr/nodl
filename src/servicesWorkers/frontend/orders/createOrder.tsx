import React, { useState } from 'react';

export default function CreateOrderPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    address: '',
    deadline: '',
  });

  return (
    <div style={{ padding: '24px', maxWidth: 720 }}>
      <h1>Создать заявку</h1>
      <p>Опишите работу, бюджет и сроки — исполнители сами откликнутся.</p>
      <form style={{ display: 'grid', gap: '12px' }}>
        <label style={labelStyle}>
          Категория
          <input
            style={inputStyle}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="плиточник"
          />
        </label>
        <label style={labelStyle}>
          Заголовок
          <input
            style={inputStyle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Положить плитку в ванной"
          />
        </label>
        <label style={labelStyle}>
          Описание
          <textarea
            style={{ ...inputStyle, minHeight: 140 }}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Уложить плитку 12м², подготовить стены"
          />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <label style={labelStyle}>
            Бюджет (BYN)
            <input
              style={inputStyle}
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="150"
            />
          </label>
          <label style={labelStyle}>
            Дедлайн
            <input
              style={inputStyle}
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              placeholder="завтра"
            />
          </label>
        </div>
        <label style={labelStyle}>
          Адрес
          <input
            style={inputStyle}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="ул. Пушкина 15"
          />
        </label>
        <button type="button" style={submitStyle}>
          Опубликовать заявку
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
  background: '#00a36f',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 700,
};
