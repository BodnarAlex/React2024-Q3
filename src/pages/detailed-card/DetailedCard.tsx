import type { ReactNode } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useFetchPersonQuery } from '../../services/api.ts';
import { MiniLoader } from '../../components/mini-loader/MiniLoader';

export function DetailedCard(): ReactNode {
  const { details } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: person, error, isLoading } = useFetchPersonQuery(details || '');

  const handleCloseButtonClick = (): void => {
    if (location.pathname.includes('/details/')) {
      const params = new URLSearchParams(location.search);
      navigate({
        pathname: '/',
        search: params.toString(),
      });
    }
  };

  if (isLoading) {
    return <MiniLoader />;
  }

  if (error) {
    return <div>Error fetching person details.</div>;
  }

  if (!person) {
    return <div>No person found.</div>;
  }

  const cardInfo = [
    { key: '1', label: 'Mass', value: person.mass },
    { key: '2', label: 'Height', value: person.height },
    { key: '3', label: 'Gender', value: person.gender },
    { key: '4', label: 'Hair Color', value: person.hair_color },
    { key: '5', label: 'Eye Color', value: person.eye_color },
    { key: '6', label: 'Skin Color', value: person.skin_color },
    { key: '7', label: 'Birth Year', value: person.birth_year },
  ];

  return (
    <div className={styles.detailCard}>
      <button className={styles.closeButton} onClick={handleCloseButtonClick}>
        &#10006;
      </button>

      <h3 className={styles.name}>{person.name}</h3>
      {cardInfo.map((detail) => (
        <p key={detail.key} className={styles.paragraph}>
          {detail.label}: <span className={styles.detail}>{detail.value}</span>
        </p>
      ))}
    </div>
  );
}
