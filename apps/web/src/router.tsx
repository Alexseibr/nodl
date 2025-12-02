import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { AdDetailsPage } from './pages/AdDetailsPage';
import { CreateAdPage } from './pages/CreateAdPage';
import { StoresPage } from './pages/StoresPage';
import { StoreDetailsPage } from './pages/StoreDetailsPage';
import { TendersPage } from './pages/TendersPage';
import { TenderDetailsPage } from './pages/TenderDetailsPage';
import { ProfilePage } from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'ads/create', element: <CreateAdPage /> },
      { path: 'ads/:id', element: <AdDetailsPage /> },
      { path: 'stores', element: <StoresPage /> },
      { path: 'stores/:id', element: <StoreDetailsPage /> },
      { path: 'tenders', element: <TendersPage /> },
      { path: 'tenders/:id', element: <TenderDetailsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
