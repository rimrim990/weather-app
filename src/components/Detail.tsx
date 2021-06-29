import React from 'react';
import './Detail.css';

interface AppProps {
  list: Array<Record<string, any>>;
  day: string;
  lclass: string;
}

function Detail({ list, day, lclass }: AppProps): JSX.Element {
  return (
    <div className={lclass}>
      {list.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ul key={index}>
            <h3>{item.dt_txt.split(' ')[1]}</h3>
            <div className="weather list">
              <li>
                <span>{item.weather[0].main}</span>
              </li>
              <li>
                <p>{item.weather[0].description}</p>
              </li>
              <li>
                <img
                  alt={item.weather[0].main}
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                />
              </li>
            </div>
            <div className="temp list">
              <li>
                <span className="desc">low</span>
                <br />
                <span className="val">{item.main.temp_min}&#8451;</span>
              </li>
              <li>
                <span className="desc">temp</span>
                <br />
                <span className="val">{item.main.temp}&#8451;</span>
              </li>
              <li>
                <span className="desc">high</span>
                <br />
                <span className="val">{item.main.temp_max}&#8451;</span>
              </li>
            </div>
          </ul>
        );
      })}
    </div>
  );
}

export default Detail;
