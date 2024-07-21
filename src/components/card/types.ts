import type { IPeopleResponse } from '../../api/types.ts';

export interface ICardProps {
  person: IPeopleResponse;
  isActive?: boolean;
}
