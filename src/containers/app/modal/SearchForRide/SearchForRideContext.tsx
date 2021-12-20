import { getPossibleRides } from 'api/callables';
import moment from 'moment';
import React from 'react';
import { Address, Ride } from 'types/models';

export interface SearchForRideState {
  origin: Address | null;
  destination: Address | null;
  date: string;
  searchedRides: Ride[];
  isFetchingSearchedRides: boolean;
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
  isFetchingSearchedRides: false,
  setOrigin: () => { },
  setDestination: () => { },
  setDate: () => { }
});

export default SearchForRideContext;


export class SearchForRideProvider extends React.Component<{}, SearchForRideState> {
  state: SearchForRideState = {
    origin: null,
    destination: null,
    date: moment().set({ hours: 12, minutes: 0 }).toISOString(),
    searchedRides: [],
    isFetchingSearchedRides: false,
  };

  handleSearchRides = async () => {
    const { date, origin, destination } = this.state;
    this.setState({ isFetchingSearchedRides: true })
    if (origin !== null && destination !== null) {
      const rides = await getPossibleRides({ date, whereFrom: origin, whereTo: destination });
      this.setState({ searchedRides: rides });
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
          setOrigin: this.setOrigin,
          setDestination: this.setDestination,
          setDate: this.setDate,
        }}>
        {this.props.children}
      </SearchForRideContext.Provider>
    );
  }
}
