import React, { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from 'react-router-dom';
import ArizonaAndIllinoisDistricts from '../assets/Arizona_Illinois_Districts.json';


const geojsonData = ArizonaAndIllinoisDistricts;
  const layerStyle = {
    id: 'landuse_park',
    type: 'fill',
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': 0.5
    }
  };
    
const ZOOMSTATE = {
  Arizona: [-111.093735, 34.048927, 5.75],
  Illinois: [-89, 39.75, 5.75],
  USA: [-98.5795, 39.8283, 3]
}
const MapPage = () => {
    const map = useRef(null);
    const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
    const { state } = useParams();
    const [zoomState, setZoomState] = useState(state !== undefined);
    let lat = 39.8283;
    let long = -98.5795;
    let zoom = 3;
    if(state)
    {
      long = ZOOMSTATE[state][0];
      lat = ZOOMSTATE[state][1];
      zoom = ZOOMSTATE[state][2];
    }
    console.log(state);
    // const handleLoad = (event) => {
    //   console.log("loaded");
    //   const instance = event.target;
    //   map.current = instance;
    // }
    // useEffect(() => {
    //   console.log("map here")
    //   if (map.current) {
    //     console.log("map in")
    //     switch (state) {
    //       case 'Arizona':
    //         map.current.flyTo({center: [-111.093735, 34.048927], zoom: 5.75});
    //         break;
    //       case 'Illinois':
    //         map.current.flyTo({center: [-89, 39.75], zoom: 5.75});
    //         break;
    //     }
    //   }
    // }, [state]);

    function zoomTo() {
      if(map.current)
      {
        console.log()
        if(zoomState)
        {
          map.current.flyTo({center: [ZOOMSTATE["USA"][0], ZOOMSTATE["USA"][1]], zoom: ZOOMSTATE["USA"][2]});
        }
        else
        {
          map.current.flyTo({center: [ZOOMSTATE[state][0], ZOOMSTATE[state][1]], zoom: ZOOMSTATE[state][2]});
        }
        setZoomState(!zoomState);
      }
    }
    const handleClick = (event) => {
      const { features } = event;
      const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
      //console.log(event)
      if (clickedFeature) {
        console.log("Feature clicked:", clickedFeature);
      }
    };
    return (
      <div className="relative w-full h-screen">
        <button
        style={{ position: 'absolute', zIndex: 9999, top: '20px', left: '20px', backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '5px' }} 
        onClick={zoomTo}>
          Zoom
        </button>
        <Map 
            ref={map}
            mapboxAccessToken={accessToken}
            initialViewState={{
                longitude: long,
                latitude: lat,
                zoom: zoom
            }}
            style={{width: '100vw', height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            attributionControl={false}
            onClick={handleClick}
            interactiveLayerIds={['landuse_park']}
            // onLoad={handleLoad}
        >
        <Source id="my-data" type="geojson" data={geojsonData}>
        <Layer {...layerStyle}/>
        </Source>
        </Map>
      </div>
    );
};

export default MapPage;
