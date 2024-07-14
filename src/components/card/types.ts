import type { IPeopleResponse } from '../../api/types.ts';

export interface ICardProps {
  person: IPeopleResponse;
  onClick: () => void;
}
