/* eslint-disable react/no-array-index-key */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import axios from 'axios';
import './Weather.css';
import Detail from './Detail';

interface MyProps {
  city: string;
  isClicked: boolean;
}
interface MyState {
  isLoading: boolean;
  list: Array<Record<string, any>>;
}

class Weather extends React.Component<MyProps, MyState> {
  state: MyState = {
    isLoading: true,
    list: [],
  };

  componentDidMount() {
    const { city } = this.props;
    this.getData(city);
  }

  getData = async (city: string) => {
    try {
      const {
        data: { list },
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=5f2259e851f23e2fc4a48a9deb127b54`,
      );
      this.setState({ list, isLoading: false });
    } catch {
      this.setState({
        list: [],
        isLoading: false,
      });
    }
  };

  render() {
    const { city, isClicked } = this.props;
    const { isLoading, list } = this.state;
    const dayList: string[] = [];
    const weatherList: any[][] = Array(6)
      .fill(null)
      .map(() => []);

    if (!isLoading || isClicked || list.length) {
      list.forEach((data) => {
        const [day] = data.dt_txt.split(' ');
        const pos: number = dayList.indexOf(day);
        if (pos === -1) {
          dayList.push(day);
          weatherList[dayList.length - 1].push(data);
        } else {
          weatherList[pos].push(data);
        }
      });
    }

    return isLoading || !isClicked || !list.length ? (
      <div className="content load">Loading...</div>
    ) : (
      <div>
        <h1>{city[0].toUpperCase() + city.substring(1)}</h1>
        {weatherList.map((item, index) => {
          return (
            <Detail key={dayList[index]} list={item} day={dayList[index]} />
          );
        })}
      </div>
    );
  }
}

export default Weather;
