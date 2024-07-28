import { type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAll } from '../../store/slices/selectedItemsSlice';
import type { RootState } from '../../store/rootReducer.ts';
import styles from './styles.module.scss';

export function Flyout(): ReactNode {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const handleUnselectAll = (): void => {
    dispatch(unselectAll());
  };

  const handleDownload = (): void => {
    // alert(`Downloading ${selectedItems.length} items`);
  };

  return (
    <div className={styles.flyout}>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <p>{selectedItems.length} items are selected</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
