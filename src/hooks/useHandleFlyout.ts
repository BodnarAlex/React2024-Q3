import { useDispatch } from 'react-redux';
import type { IPeopleResponse } from '../services/types.ts';
import { unselectAll } from '../store/slices/selectedItemsSlice.ts';

interface IFlyout {
  downloadUrl: string;
  handleRemoveAll: () => void;
}

const headers = [
  'Id',
  'Name',
  'Url',
  'Height',
  'Mass',
  'Hair',
  'Skin',
  'Eye',
  'Gender',
];

function fillData(peoples: IPeopleResponse[]): string {
  const data: string[][] = peoples.map((people) => [
    people.id || '',
    people.name || '',
    people.url || '',
    people.height || '',
    people.mass || '',
    people.hair_color || '',
    people.skin_color || '',
    people.eye_color || '',
    people.gender || '',
  ]);

  return [headers.join(';'), ...data.map((item) => item.join(';'))].join('\n');
}

export const useHandleFlyout = (favorites: IPeopleResponse[]): IFlyout => {
  const dispatch = useDispatch();

  const handleRemoveAll = (): void => {
    dispatch(unselectAll());
  };

  const handleDownload = (): string => {
    const csvContent = fillData(favorites);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  };

  const downloadUrl = handleDownload();
  return { downloadUrl, handleRemoveAll };
};
