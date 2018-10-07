import React, {Component} from 'react';

class Forms extends Component {
    render() {
        return (
              <form onSubmit={this.props.getWeather} className="form-inline">
                  <input className="form-control mr-sm-2" type="text" name="city" placeholder="Enter city name" aria-label="Search"/>
                  <button className="btn btn-outline-secondary my-2 my-sm-0">Search</button>
              </form>
        )
    };
}
export default Forms;
