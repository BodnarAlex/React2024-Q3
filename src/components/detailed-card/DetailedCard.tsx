import { type ReactNode } from 'react';
import styles from './styles.module.scss';
import type { ICardProps } from './types.ts';

export function DetailedCard({ person, onClose }: ICardProps): ReactNode {
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
    <div key={person.created} className={styles.detailCard}>
      <button onClick={onClose} className={styles.closeButton}>
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
