/* eslint-disable react/state-in-constructor */
import React from 'react';
import Weather from './Weather';
import './Search.css';

interface MyState {
  city: string;
  isClicked: boolean;
}

class Search extends React.Component<unknown, MyState> {
  state: MyState = { city: '', isClicked: false };

  handleClick = () => {
    this.setState({ isClicked: true });
  };

  handleChange = (e: any) => {
    this.setState({ city: e.target.value, isClicked: false });
  };

  render() {
    const { city, isClicked } = this.state;
    return (
      <section className="weather-forecast">
        <div className="search">
          <input
            className="search-input"
            type="text"
            onChange={this.handleChange}
            value={city}
          />
          <input
            type="submit"
            className="search-button"
            onClick={this.handleClick}
            value="Go"
          />
        </div>
        {isClicked ? (
          <Weather city={city} isClicked={isClicked} />
        ) : (
          <div className="content">typing...</div>
        )}
      </section>
    );
  }
}

export default Search;
