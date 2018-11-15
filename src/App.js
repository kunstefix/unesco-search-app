import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Table } from 'react-bootstrap';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }


  getNearestPlaces(lat, lng) {
    console.log(lat, lng);
    try {
      fetch(`http://localhost:10010/nearby?lat=${lat}&lng=${lng}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ data: data.nearby_sites })
          console.log(this.state);
        }
        );
    } catch (error) {
      console.log(error);
      this.setState({ error: "Connection problem." })
    }

  }

  render() {
    let lat = 0;
    let lng = 0;

    return (
      <div>
        <div className="jumbotron text-center">
          <h2>Find closest Unesco sites</h2></div>
        <div className="container">

          <div style={{ display: 'block', textAlign: 'center' }}>
            <Autocomplete
              style={{ width: '50%' }}
              onPlaceSelected={(place) => {
                console.log("PLAC: ", place);

                if (place.geometry) {
                  lat = place.geometry.location.lat();
                  lng = place.geometry.location.lng();
                  this.getNearestPlaces(lat, lng);
                } else {
                  this.setState({ data: [] });
                }
              }}
            />
          </div>

          <br /><br /><br />


          {this.state.data.length > 0 &&
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Agent</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((place, i) => {
                  return <tr key={i}>
                    <td>{place.name}</td>
                    <td>{place.agent}</td>
                  </tr>
                })}
              </tbody>
            </Table>}

          {this.state.error && <div style={{ display: 'block', textAlign: 'center' }}>{this.state.error} </div>}
        </div>
      </div>
    );
  }
}

export default App;
