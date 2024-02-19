import React, { useEffect, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
//import geojsonData from '../assets/Arizona_Districts.geojson';
const geojsonData = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-114.0437, 36.9991],
          [-109.0452, 36.9989], 
          [-109.0501, 31.3325],
          [-111.1026, 31.3961], 
          [-114.7996, 32.5183],
          [-114.0437, 36.9991]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Illinois"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-91.5120, 40.1998], 
            [-87.4952, 42.4943], 
            [-87.0199, 42.5083], 
            [-87.0199, 39.9860], 
            [-87.5304, 39.3210], 
            [-89.1336, 37.8749],
            [-91.1853, 37.2169],
            [-91.5120, 40.1998]  
          ]
        ]
      }
    } 
  ]
  };
  const layerStyle = {
    id: 'landuse_park',
    type: 'fill',
    paint: {
      'fill-color': '#4E3FC8',
      'fill-opacity': 0.5
    }
  };
    

const MapPage = () => {
    // const mapContainerRef = useRef(null);
    const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
    // useEffect(() => {
    //     mapboxgl.accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;

    //     const map = new mapboxgl.Map({
    //         container: mapContainerRef.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [-98.5795, 39.8283],
    //         zoom: 3, 
    //     });

    //     map.on('load', () => {
    //         // Here you would add your GeoJSON data source for US states
    //         // and any interactivity, such as click events to zoom into states
    //     });

    //     return () => map.remove();
    // }, []);

    return (
        // <div>
        //     <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
        // </div>
        <Map 
            mapboxAccessToken={accessToken}
            initialViewState={{
                longitude: -98.5795,
                latitude: 39.8283,
                zoom: 3
            }}
            style={{width: '100vw', height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            attributionControl={false}
        >
        <Source id="my-data" type="geojson" data={geojsonData}>
        <Layer {...layerStyle} />
        </Source>
        </Map>
    );
};

export default MapPage;
