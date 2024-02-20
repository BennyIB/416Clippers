import React, { useState, useRef, useCallback, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from 'react-router-dom';
import ArizonaAndIllinoisDistricts from '../assets/Arizona_Illinois_Districts.json';

import ChartModal from '../components/modal'
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
};

const MapPage = () => {
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
  const { state } = useParams();
  const [viewport, setViewport] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3,
  });

  useEffect(() => {
    if (state && ZOOMSTATE[state]) {
      setViewport({
        longitude: ZOOMSTATE[state][0],
        latitude: ZOOMSTATE[state][1],
        zoom: ZOOMSTATE[state][2]
      });
    }
  }, [state]);

  const zoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: prevViewport.zoom + 1
    }));
  };

  const zoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: prevViewport.zoom - 1
    }));
  };

  const resetZoom = () => {
    if(mapRef.current)
    {
      mapRef.current.flyTo({center: [ZOOMSTATE[state][0], ZOOMSTATE[state][1]], zoom: ZOOMSTATE[state][2]})
    }
  }

  const handleClick = (event) => {
    const { features } = event;

    const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
    if (clickedFeature) {
      console.log("hello")
      setShowModal(true);
    }
  };



  return (
    <div className="relative w-full h-screen">
      <div className="absolute right-5 bottom-5 z-10 flex flex-col">

        <button
          className="mb-2 bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={zoomIn}
        >
          +
        </button>
    
        <button
          className="mb-2 bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={zoomOut}
        >
          -
        </button>

        <button
          className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={resetZoom}
        >
          🔙
        </button>
      </div>

      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={handleClick}
        interactiveLayerIds={['landuse_park']}
      >
    
        {showModal && <ChartModal state={state} setShowModal={setShowModal}/>}
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default MapPage;
