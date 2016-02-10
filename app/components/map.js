import React from 'react';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import '../../node_modules/leaflet/dist/leaflet.css';
import './map.scss';

const Map = React.createClass({

  getInitialState: function() {
    return {};
  },

  getDefaultProps: function() {
    return {
      options: {},
      crosshair: true
    };
  },

  render: function() {

    var crosshair;
    if (this.props.crosshair) {
      crosshair = (
        <div className='map-crosshair-container'>
          <div className='map-crosshair' />
        </div>
      );
    }

    var className = 'map-container';
    if (this.getOptions('grayscale')) {
      className += ' grayscale';
    }

    return (
      <div className={className}>
        <div className='map' ref='map' />
        {crosshair}
      </div>
    );
  },

  getOptions: function(key) {
    return this.props.options[key] || this.props.defaults.map[key];
  },

  componentDidMount: function() {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: this.getOptions('center'),
      zoom: this.getOptions('zoom'),
      maxZoom: this.getOptions('maxZoom'),
      scrollWheelZoom: 'center',
      doubleClickZoom: 'center'
    });

    var layer = L.tileLayer(this.getOptions('tileUrl'), {
      subdomains: this.getOptions('subdomains').toString(),
      attribution: this.getOptions('attribution')
    }).addTo(map);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach(event => map.on(event, this.props.mapEvents[event]));
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map);
    }

    this.setState({
      map: map
    });
  },

  roundCoordinates: function(coordinate) {
    return Math.round(coordinate * 1000000) / 1000000;
  },

  getMap: function() {
    return this.state.map;
  },

  setView: function(center, zoom) {
    if (this.state.map) {
      this.state.map.setView(center, zoom);
    }
  },

  getView: function() {
    if (this.state.map) {
      var center = this.state.map.getCenter();
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinates),
        zoom: this.state.map.getZoom(),
      };
    } else {
      return null;
    }
  }

});

export default Map;
