/* eslint-disable react/no-array-index-key */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import axios from 'axios';

interface MyProps {
  city: string;
  isClicked: boolean;
}
interface MyState {
  isLoading: boolean;
  weather: Array<Record<string, number | string>>;
}

class Weather extends React.Component<MyProps, MyState> {
  state: MyState = {
    isLoading: true,
    weather: [],
  };

  componentDidMount() {
    const { city } = this.props;
    this.getData(city);
  }

  getData = async (city: string) => {
    try {
      const {
        data: { weather },
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f2259e851f23e2fc4a48a9deb127b54`,
      );
      this.setState({ weather, isLoading: false });
    } catch {
      this.setState({
        weather: [{ msg: '404 : Not Found' }],
        isLoading: false,
      });
    }
  };

  render() {
    const { city, isClicked } = this.props;
    const { isLoading, weather } = this.state;
    return isLoading || !isClicked ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>{city}</h1>
        <ul>
          {Object.entries(weather[0]).map((arg, index) => {
            return (
              <li key={index}>
                {arg[0]} : {arg[1]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Weather;
