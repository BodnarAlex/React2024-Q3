import { type ReactNode } from 'react';
import styles from './styles.module.scss';
import type { ICardProps } from './types.ts';

export function Card({ person }: ICardProps): ReactNode {
  const cardInfo = [
    { key: '1', label: 'Birth Year', value: person.birth_year },
    { key: '2', label: 'Gender', value: person.gender },
    { key: '3', label: 'Mass', value: person.mass },
    { key: '4', label: 'Height', value: person.height },
    { key: '5', label: 'Hair Color', value: person.hair_color },
    { key: '6', label: 'Eye Color', value: person.eye_color },
    { key: '7', label: 'Skin Color', value: person.skin_color },
  ];

  return (
    <div key={person.created} className={styles.card}>
      <h3 className={styles.name}>{person.name}</h3>
      {cardInfo.map((detail) => (
        <p key={detail.key} className={styles.paragraph}>
          {detail.label}: <span className={styles.detail}>{detail.value}</span>
        </p>
      ))}
    </div>
  );
}
