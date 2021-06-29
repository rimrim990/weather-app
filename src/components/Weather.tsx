/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
  code: number;
}

class Weather extends React.Component<MyProps, MyState> {
  // eslint-disable-next-line react/state-in-constructor
  state: MyState = {
    isLoading: true,
    list: [],
    code: 0,
  };

  componentDidMount() {
    const { city } = this.props;
    this.getData(city);
  }

  getData = async (city: string) => {
    try {
      const {
        data: { list, cod },
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=5f2259e851f23e2fc4a48a9deb127b54`,
      );
      this.setState({ list, isLoading: false, code: cod });
    } catch (error) {
      this.setState({
        list: [],
        isLoading: false,
        code: 404,
      });
    }
  };

  makeActive = (event: any) => {
    const dlist = document.getElementsByClassName('content');
    const alist = document.getElementsByClassName('nav-btn');
    for (let i = 0; i < dlist.length; i += 1) {
      if (event.target === alist[i]) alist[i].classList.add('selected');
      else alist[i].classList.remove('selected');
      if (dlist[i] === event.target.nextSibling) {
        dlist[i].classList.add('active');
      } else {
        dlist[i].classList.remove('active');
      }
    }
  };

  render() {
    const { city, isClicked } = this.props;
    const { isLoading, list, code } = this.state;
    const msg = code === 404 ? 'Not Found...' : 'Loading...';
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
      <div className="content-area">
        <section>
          <div className="content-load">{msg}</div>
        </section>
      </div>
    ) : (
      <div className="content-area">
        <h3>{city[0].toUpperCase() + city.substring(1).toLowerCase()}</h3>
        <section>
          {weatherList.map((item, index) => {
            const aclass = index === 0 ? 'nav-btn selected' : 'nav-btn';
            const lclass = index === 0 ? 'content active' : 'content';
            return (
              // eslint-disable-next-line react/no-array-index-key
              <article key={index}>
                <a className={aclass} onClick={this.makeActive}>
                  {dayList[index]}
                </a>
                <Detail list={item} day={dayList[index]} lclass={lclass} />
              </article>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Weather;
