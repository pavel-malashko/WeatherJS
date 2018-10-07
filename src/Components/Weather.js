import React, {Component} from 'react';
import sunny from "../img/svg/sunny.svg"
import rain from "../img/svg/rain.svg"
import clouds from  "../img/svg/cloud.svg"
import snow from  "../img/svg/snow.svg"
import haze from  "../img/svg/haze.svg"
import storm from  "../img/svg/storm.svg"

class Weather extends Component {
    picture = () => {
        switch (this.props.image) {
            case 'Clear':
                return <img src={sunny}  alt="sunny" />;
            case 'Clouds':
                return <img src={clouds}  alt="clouds" />;
            case 'Rain' :
                return <img src={rain}  alt="rain" />;
            case 'Drizzle' :
                 return <img src={rain}  alt="rain" />;
            case 'Mist'  :
                 return <img src={rain}  alt="rain" />;
            case 'Fog' :
                 return <img src={rain}  alt="rain" />;
            case 'Snow':
                  return <img src={snow}  alt="snow" />;
            case 'Haze':
                  return <img src={haze}  alt="haze" />;
            case 'Storm':
                  return <img src={storm}  alt="storm" />;
            default:
                return null;
        }
    };
render() {
        return (
            <div className="data-weth">
                {this.picture()&& <div className="d-flex justify-content-center align-items-center ml-5 p-3">
                     {this.picture()} </div>}
                <ul className="rounded">
                {this.props.city && <li className="list-group-item list-group-item-dark">
                    Location: {this.props.city}, {this.props.country}</li>}
                {this.props.temperature && <li className="list-group-item list-group-item-dark">
                    Temperature: {this.props.temperature} C</li>}
                {this.props.temperature && <li className="list-group-item list-group-item-dark">
                    Conditions: {this.props.description}</li>}
                {this.props.humidity && <li className="list-group-item list-group-item-dark">
                    Humidity: {this.props.humidity}</li>}
                {this.props.tomorrow && <li className="list-group-item list-group-item-info">
                    Tomorrow: {this.props.tomorrow} C</li>}
                {this.props.nextAftTom && <li className="list-group-item list-group-item-info">
                    Day After Tomorrow: {this.props.nextAftTom} C</li>}
                {this.props.error && <li className="list-group-item list-group-item-danger">
                    {this.props.error}</li>}
                </ul>
            </div>
        )
    };
}
export default Weather;
