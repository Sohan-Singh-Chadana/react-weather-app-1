import "../styles/components/Forecast.scss";
import DailyForecastWidget from "./DailyForecastWidget";
import HorizontallyScrollable from "./HorizontallyScrollable";
import HourlyForecastWidget from "./HourlyForecastWidget";

function Forecast({ title, data, type }) {
  return (
    <div className="Forecast">
      <div className="forecast-container">
        <h3>{title}</h3>
        <HorizontallyScrollable className="widget-container">
          {data.map((singleData, index) => (
            <div key={`${singleData.date || singleData.day}-${index}`}>
              {type === "hourly" ? (
                <HourlyForecastWidget data={singleData} />
              ) : (
                <DailyForecastWidget data={singleData} />
              )}
            </div>
          ))}
        </HorizontallyScrollable>
      </div>
    </div>
  );
}

export default Forecast;
