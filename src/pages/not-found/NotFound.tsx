import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPage } from '../../store/slices/paginationSlice';
import styles from './styles.module.scss';

export function NotFound(): ReactNode {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (): void => {
    dispatch(setPage(1));
    const params = new URLSearchParams(location.search);
    params.set('page', '1');
    params.set('search', '');
    navigate('/');
  };

  return (
    <main className='main'>
      <h1 className={styles.title}>This is</h1>
      <div className={styles.dart}>
        <div className={styles.error}>404</div>
      </div>
      <div onClick={handleClick} className={styles.refreshBtn}>
        Return on other side
      </div>
    </main>
  );
}
