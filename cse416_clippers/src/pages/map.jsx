import React, { useEffect, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
//import geojsonData from '../assets/Arizona_Districts.geojson';
import arizonaJsonData from '../assets/arizona.json'
import illinoiJsonData from '../assets/illinois.json'
const geojsonData = {
    type: 'FeatureCollection',
    features: [
      arizonaJsonData,
      illinoiJsonData
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
