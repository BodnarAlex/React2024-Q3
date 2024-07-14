import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page/MainPage.tsx';
import { NotFound } from './pages/not-found/NotFound.tsx';

export function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
