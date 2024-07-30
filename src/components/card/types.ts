import type { IPeopleResponse } from '../../services/types.ts';

export interface ICardProps {
  person: IPeopleResponse;
  isActive?: boolean;
}
