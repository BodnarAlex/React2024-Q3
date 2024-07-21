import type { IAllResponse, IPeopleResponse } from './types.ts';

export async function fetchData(
  searchText: string,
  perPage: number,
): Promise<IAllResponse> {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchText}&page=${perPage}`,
  );
  return (await response.json()) as Promise<IAllResponse>;
}

export async function fetchPerson(id: string): Promise<IPeopleResponse> {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  return (await response.json()) as Promise<IPeopleResponse>;
}
