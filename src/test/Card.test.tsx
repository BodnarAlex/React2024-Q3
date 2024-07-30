import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store/index.ts';
import { Card } from '../components/card/Card.tsx';
import type { IPeopleResponse } from '../services/types.ts';

describe('Card Component', () => {
  const person: IPeopleResponse = {
    id: '14',
    birth_year: '19BBY',
    eye_color: 'Blue',
    films: ['https://swapi.dev/api/films/1/'],
    gender: 'Male',
    hair_color: 'Blond',
    height: '172',
    homeworld: 'https://swapi.dev/api/planets/1/',
    mass: '77',
    name: 'Luke Skywalker',
    skin_color: 'Fair',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-10T13:52:43.172000Z',
    species: ['https://swapi.dev/api/species/1/'],
    starships: ['https://swapi.dev/api/starships/12/'],
    url: 'https://swapi.dev/api/people/1/',
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
  };

  test('should render card with person details', () => {
    render(
      <Provider store={store}>
        <Router>
          <Card person={person} isActive={false} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Mass:/i)).toHaveTextContent('Mass: 77');
    expect(screen.getByText(/Height:/i)).toHaveTextContent('Height: 172');
    expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender: Male');
    expect(screen.getByText(/Skin Color:/i)).toHaveTextContent(
      'Skin Color: Fair',
    );
    expect(screen.getByText(/Birth Year:/i)).toHaveTextContent(
      'Birth Year: 19BBY',
    );
  });
});
