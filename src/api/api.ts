import type { IAllResponse } from './types.ts';

export async function fetchData(searchText: string, perPage: number): Promise<IAllResponse> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchText}&limit=${perPage}&page=1`);
  return (await response.json()) as Promise<IAllResponse>;
}
