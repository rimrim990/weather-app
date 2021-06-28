import React from 'react';

interface AppProps {
  list: Array<Record<string, any>>;
  day: string;
}

function Detail({ list, day }: AppProps): JSX.Element {
  return (
    <div className="content">
      <h1>{day}</h1>
      {list.map((item) => {
        return (
          <ul className={day} key={day}>
            <h3>{item.dt_txt.split(' ')[1]}</h3>
            <div className="weather list">
              <li className="name">
                <span>{item.weather[0].main}</span>
              </li>
              <li className="desc">
                <p>{item.weather[0].description}</p>
              </li>
              <li className="icon">
                <img
                  alt={item.weather[0].main}
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                />
              </li>
            </div>
            <div className="temp list">
              <li>
                <span>low</span>
                <br />
                <span>{item.main.temp_min}</span>
              </li>
              <li>
                <span>temp</span>
                <br />
                <span>{item.main.temp}</span>
              </li>
              <li>
                <span>high</span>
                <br />
                <span>{item.main.temp_max}</span>
              </li>
            </div>
          </ul>
        );
      })}
    </div>
  );
}

export default Detail;
