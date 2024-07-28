import { type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import type { ICardProps } from './types.ts';

export function Card({ person, isActive }: ICardProps): ReactNode {
  const location = useLocation();
  const navigate = useNavigate();

  const cardInfo = [
    { key: '1', label: 'Mass', value: person.mass },
    { key: '2', label: 'Height', value: person.height },
    { key: '3', label: 'Gender', value: person.gender },
    { key: '6', label: 'Skin Color', value: person.skin_color },
    { key: '4', label: 'Birth Year', value: person.birth_year },
  ];

  const handleCardClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const params = new URLSearchParams(location.search);
    navigate(`/details/${person.id}?${params.toString()}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
    >
      <h3 className={styles.name}>{person.name}</h3>
      {cardInfo.map((detail) => (
        <p key={detail.key} className={styles.paragraph}>
          {detail.label}: <span className={styles.detail}>{detail.value}</span>
        </p>
      ))}
    </div>
  );
}
