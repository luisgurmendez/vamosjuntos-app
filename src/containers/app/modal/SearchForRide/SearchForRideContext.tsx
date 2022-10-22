import { WithChildren } from 'components/types';
import useCallable, { CallableResponse } from 'hooks/useCallable';
import moment from 'moment';
import React from 'react';
import { Address, Ride } from 'types/models';

export interface SearchForRideState {
  origin: Address | null;
  destination: Address | null;
  date: string;
  searchedRides: Ride[];
  isFetchingSearchedRides: boolean;
  hasAlreadyMadeASearch: boolean;
}

export interface SearchForRideApi {
  setOrigin: (origin: Address | null) => void;
  setDestination: (destination: Address | null) => void;
  setDate: (date: string) => void;
}

export interface SearchForRideContextState extends SearchForRideState, SearchForRideApi { }

const SearchForRideContext = React.createContext<SearchForRideContextState>({
  origin: null,
  destination: null,
  date: new Date().toISOString(),
  searchedRides: [],
  hasAlreadyMadeASearch: false,
  isFetchingSearchedRides: false,
  setOrigin: () => { },
  setDestination: () => { },
  setDate: () => { }
});

export default SearchForRideContext;

interface SearchForRideProviderUnwrappedProps extends WithChildren, WithSearchRidesCallable { }

class SearchForRideProviderUnwrapped extends React.Component<SearchForRideProviderUnwrappedProps, SearchForRideState> {
  state: SearchForRideState = {
    origin: null,
    destination: null,
    date: moment().set({ hours: 12, minutes: 0 }).toISOString(),
    searchedRides: [],
    isFetchingSearchedRides: false,
    hasAlreadyMadeASearch: false,
  };

  handleSearchRides = async () => {
    const { date, origin, destination } = this.state;

    this.setState({ isFetchingSearchedRides: true, hasAlreadyMadeASearch: true })
    if (origin !== null && destination !== null) {
      const rides = await this.props.searchRides({ date, whereFrom: origin, whereTo: destination });
      this.setState({ searchedRides: rides.data });
    }
    this.setState({ isFetchingSearchedRides: false })
  }

  setOrigin = (origin: Address | null) => {
    this.setState({ origin }, this.handleSearchRides);
  }

  setDestination = (destination: Address | null) => {
    this.setState({ destination }, this.handleSearchRides);
  }

  setDate = (date: string) => {
    this.setState({ date }, this.handleSearchRides);
  }

  render() {
    return (
      <SearchForRideContext.Provider
        value={{
          origin: this.state.origin,
          destination: this.state.destination,
          date: this.state.date,
          searchedRides: this.state.searchedRides,
          isFetchingSearchedRides: this.state.isFetchingSearchedRides,
          hasAlreadyMadeASearch: this.state.hasAlreadyMadeASearch,
          setOrigin: this.setOrigin,
          setDestination: this.setDestination,
          setDate: this.setDate,
        }}>
        {this.props.children}
      </SearchForRideContext.Provider>
    );
  }
}

export const SearchForRideProvider = withSearchRidesCallable(SearchForRideProviderUnwrapped)

interface WithSearchRidesCallable {
  searchRides: <B>(body?: B) => Promise<CallableResponse<Ride[]>>;
}

function withSearchRidesCallable<P extends WithSearchRidesCallable>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentType<WithChildren> {

  const Component: React.FC<WithChildren> = ({ children }) => {
    const searchRides = useCallable<Ride[]>('/rides/search');

    const wrappedProps = {
      children,
      searchRides
    } as unknown as P

    return (
      <WrappedComponent {...wrappedProps} />
    )
  };

  Component.displayName = `withSearchRidesCallable(${WrappedComponent.displayName})`
  return Component;
}
