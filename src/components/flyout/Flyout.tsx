import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useHandleFlyout } from '@/hooks/useHandleFlyout.ts';
import type { RootState } from '../../store/rootReducer.ts';
import styles from './styles.module.scss';

export function Flyout(): ReactNode {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const { downloadUrl, handleRemoveAll } = useHandleFlyout(selectedItems);

  const handleUnselectAll = (): void => {
    handleRemoveAll();
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <button className={styles.button} onClick={handleUnselectAll}>
        Unselect all
      </button>
      <p className={styles.text}>{selectedItems.length} items are selected</p>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`${selectedItems.length}_star_wars_characters.csv`}
          onClick={handleUnselectAll}
        >
          <div className={styles.button}>Download</div>
        </a>
      )}
    </div>
  );
}
