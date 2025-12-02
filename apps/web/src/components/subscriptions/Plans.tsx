import React from 'react';

export interface PlanCardProps {
  code: 'starter' | 'pro' | 'pro_plus';
  title: string;
  price: string;
  features: string[];
  onSelect?: (code: PlanCardProps['code']) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ code, title, price, features, onSelect }) => (
  <div className="plan-card">
    <h3>{title}</h3>
    <p>{price}</p>
    <ul>
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
    <button onClick={() => onSelect?.(code)}>Купить</button>
  </div>
);

export interface PlansProps {
  onSelect?: (code: PlanCardProps['code']) => void;
}

export const Plans: React.FC<PlansProps> = ({ onSelect }) => {
  const plans: PlanCardProps[] = [
    {
      code: 'starter',
      title: 'Starter',
      price: 'BYN 9.90 / RUB 390 / PLN 19',
      features: ['15 откликов', 'авто-поднятие раз в сутки', '1 выделение и 1 приоритет в месяц'],
    },
    {
      code: 'pro',
      title: 'Pro Builder',
      price: 'BYN 19.90 / RUB 690 / PLN 39',
      features: ['30 откликов', '2 выделения и 2 приоритета в месяц', 'аналитика конкурентов'],
    },
    {
      code: 'pro_plus',
      title: 'Master Pro+',
      price: 'BYN 39.90 / RUB 1190 / PLN 89',
      features: ['безлимит', 'выделение и приоритет каждую неделю', 'авто-поднятие каждые 12 часов', 'AI улучшение откликов'],
    },
  ];

  return (
    <div className="plans-grid">
      {plans.map((plan) => (
        <PlanCard key={plan.code} {...plan} onSelect={onSelect} />
      ))}
    </div>
  );
};
