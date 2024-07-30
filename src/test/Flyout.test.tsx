import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useHandleFlyout } from '@/hooks/useHandleFlyout';
import { Flyout } from '../components/flyout/Flyout.tsx';

vi.mock('@/hooks/useHandleFlyout', () => ({
  useHandleFlyout: vi.fn(),
}));

const mockUseHandleFlyout = useHandleFlyout as unknown as jest.MockedFunction<
  typeof useHandleFlyout
>;

const mockStore = configureStore([]);
const initialState = {
  selectedItems: {
    items: [],
  },
};

describe('Flyout component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should return null when there are no selected items', () => {
    const handleRemoveAllMock = vi.fn();

    store = mockStore({
      selectedItems: {
        items: [],
      },
    });

    mockUseHandleFlyout.mockReturnValue({
      downloadUrl: '',
      handleRemoveAll: handleRemoveAllMock,
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.queryByText('Unselect all')).toBeNull();
    expect(screen.queryByText('0 items are selected')).toBeNull();
    expect(screen.queryByText('Download')).toBeNull();
  });

  it('should render the component correctly with selected items', () => {
    store = mockStore({
      selectedItems: {
        items: ['item1', 'item2'],
      },
    });

    mockUseHandleFlyout.mockReturnValue({
      downloadUrl: '/0735c590-2f55-4b69-9860-aff4c510980f',
      handleRemoveAll: vi.fn(),
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.getByText('Unselect all')).toBeVisible();
    expect(screen.getByText('2 items are selected')).toBeVisible();
    expect(screen.getByText('Download')).toBeVisible();
  });

  it('should call handleRemoveAll when Unselect all button is clicked', () => {
    const handleRemoveAllMock = vi.fn();

    store = mockStore({
      selectedItems: {
        items: ['item1'],
      },
    });

    mockUseHandleFlyout.mockReturnValue({
      downloadUrl: '',
      handleRemoveAll: handleRemoveAllMock,
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(handleRemoveAllMock).toHaveBeenCalled();
  });

  it('should call handleRemoveAll when Download button is clicked', () => {
    const handleRemoveAllMock = vi.fn();

    store = mockStore({
      selectedItems: {
        items: ['item1'],
      },
    });

    mockUseHandleFlyout.mockReturnValue({
      downloadUrl: '/0735c590-2f55-4b69-9860-aff4c510980f',
      handleRemoveAll: handleRemoveAllMock,
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Download'));
    expect(handleRemoveAllMock).toHaveBeenCalled();
  });
});
