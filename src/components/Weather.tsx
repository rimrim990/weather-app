/* eslint-disable react/no-array-index-key */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import axios from 'axios';
import './Weather.css';

interface MyProps {
  city: string;
  isClicked: boolean;
}
interface MyState {
  isLoading: boolean;
  weather: Array<Record<string, string>>;
  temp: Record<string, number>;
}

class Weather extends React.Component<MyProps, MyState> {
  state: MyState = {
    isLoading: true,
    weather: [],
    temp: {},
  };

  componentDidMount() {
    const { city } = this.props;
    this.getData(city);
  }

  getData = async (city: string) => {
    try {
      const {
        data: { weather, main },
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=5f2259e851f23e2fc4a48a9deb127b54`,
      );
      this.setState({ weather, isLoading: false, temp: main });
    } catch {
      this.setState({
        weather: [],
        temp: {},
        isLoading: false,
      });
    }
  };

  render() {
    const { city, isClicked } = this.props;
    const { isLoading, weather, temp } = this.state;
    return isLoading || !isClicked || !weather.length || !temp ? (
      <div className="content load">Loading...</div>
    ) : (
      <div className="content">
        <h1>{city[0].toUpperCase() + city.substring(1)}</h1>
        <ul className="weather list">
          <li className="name">
            <span>{weather[0].main}</span>
          </li>
          <li className="desc">
            <p>{weather[0].description}</p>
          </li>
          <li className="icon">
            <img
              alt={weather[0].main}
              src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
            />
          </li>
        </ul>
        <ul className="temp list">
          <li>
            low
            <br />
            <span className="data">{temp.temp_min}&#8451;</span>
          </li>
          <li>
            temp
            <br />
            <span className="data">{temp.temp}&#8451;</span>
          </li>
          <li>
            high
            <br />
            <span className="data">{temp.temp_max}&#8451;</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Weather;
