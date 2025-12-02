import React from 'react';
import { useRouter } from 'next/router';
import { Plans } from '../../components/subscriptions/Plans';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { plan } = router.query;

  return (
    <div>
      <h1>Оформление PRO</h1>
      <p>Выбранный план: {plan}</p>
      <Plans onSelect={(code) => alert(`Оплачиваем план ${code}`)} />
    </div>
  );
};

export default CheckoutPage;
