import React, {Component} from 'react';
import Forms from "../Components/Forms";
import Weather from "../Components/Weather";
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactMapGL from 'react-map-gl';

class App extends Component {
    getWeather = async (e) => {  //here I created a function at which the synchronization takes place
        e.preventDefault();
        const Key_api = "6b474aa0006c665bf1049403ef8c8ac6";
        const city = e.target.city.value;//then I take the value of the city and put it into a const
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=${Key_api}`);
        const data = await api_call.json();//Asynchronous request received and put its in data const
        if (city) { //if equal to a city, then we output data from a file with json
            if (data.cod === 200) {  //if everything is right we continue to use data
                this.setState({
                    temperature: Math.round((data.main.temp - 273.15) * 10) / 10,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    image: data.weather[0].main,
                    viewport: {
                        width: 1920,
                        height: 938,
                        latitude: data.coord.lat,
                        longitude:data.coord.lon ,
                        zoom: 13
                    },
                    error: ""
                });
                const api_cord = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.viewport.latitude}&lon=${this.state.viewport.longitude}&appid=${Key_api}`);
                const cord = await api_cord.json(); //if the date passed the test, then we take the coordinates from there
                    this.setState({
                        tomorrow: Math.round((cord.list[8].main.temp - 273.15) * 10) / 10,
                        nextAftTom: Math.round((cord.list[16].main.temp - 273.15) * 10) / 10,
                });
            }
            else {
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    image: undefined,
                    tomorrow: undefined,
                    nextAftTom: undefined,
                    viewport: {
                        width: 1920,
                        height: 938,
                        latitude: 0,
                        longitude:0 ,
                        zoom: 3
                    },
                    error: "city not found" //If the data is wrong
                })
            }
        }
        else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                image: undefined,
                tomorrow: undefined,
                nextAftTom: undefined,
                viewport: {
                    width: 1920,
                    height: 938,
                    latitude: 0,
                    longitude:0 ,
                    zoom: 3
                },
                error: "Please enter city name" //if we have not entered anything
            })
        }
    };
    constructor(props) { //add properties to weather attributes
        super(props);
        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            image: undefined,
            tomorrow: undefined,
            nextAftTom: undefined,
            viewport: {
                width: 1920,
                height: 938,
                latitude: 0,
                longitude:0 ,
                zoom: 3
            },
            error: undefined
        };
    }
    render() {
        return (
            <div className="App">
                <Forms getWeather={this.getWeather}/>
                <Weather
                    temperature={this.state.temperature} // Passing data to the component
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    image={this.state.image}
                    tomorrow={this.state.tomorrow}
                    nextAftTom={this.state.nextAftTom}
                    picture={this.picture}/>
                <ReactMapGL ClassName="Map"  mapboxApiAccessToken={`pk.eyJ1Ijoia2luZzI0IiwiYSI6ImNqbXdhc3NkYTB6cHMzcXFvazEyaHg1NXcifQ.vS4u5nh70x7e2QIsKAciyw`}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}/>
            </div>
        );
    }
}
export default App;
