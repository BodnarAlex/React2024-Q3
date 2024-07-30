import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/main-page/MainPage.tsx';
import { NotFound } from './pages/not-found/NotFound.tsx';
import { DetailedCard } from './pages/detailed-card/DetailedCard.tsx';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary.tsx';

export function App(): ReactNode {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route path='/details/:details' element={<DetailedCard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
