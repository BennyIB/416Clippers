import React, { useState, useRef, useCallback, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from 'react-router-dom';
import ArizonaAndIllinoisDistricts from '../assets/Arizona_Illinois_Districts.json';
import EthnicityBarChart from '../EthnicityBarChart';
import EcologicalInferencePlot from '../EcologicalInferencePlot';
import EthnicityBarChartPop from '../EthnicityBarChartPop';
import PrecinctAnalysisChart from '../PrecinctAnalysisChart';

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
  const [selectedChart, setSelectedChart] = useState('');

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

  const resetZoom = useCallback(() => {
    setViewport({
      longitude: ZOOMSTATE[state][0],
      latitude: ZOOMSTATE[state][1],
      zoom: ZOOMSTATE[state][2]
    });
  }, [state]);

  const handleClick = (event) => {
    const { features } = event;

    const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
    if (clickedFeature) {
      console.log("hello")
      setShowModal(true);
    }
  };

  // Function to render the selected chart
  const renderChart = () => {
    switch (selectedChart) {
      case 'ethnicityBarChart':
        return <EthnicityBarChart />;
      case 'ecologicalInferencePlot':
        return <EcologicalInferencePlot />;
      case 'ethnicityBarChartPop':
        return <EthnicityBarChartPop />;
      case 'precinctAnalysisChart':
        return <PrecinctAnalysisChart />;
      case 'minorityRepresentationAllDistricts':
        return <img src="/all.png" alt="minority representation image" />;
      case 'minorityRepresentation9Districts':
        return <img src="/nine.png" alt="minority representation image" />;
      default:
        return <EthnicityBarChart />;
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
    
        {showModal && (
          <div className="fixed inset-0 bg-white-600 bg-opacity-50 flex justify-center items-center z-50">
            <div
              className="bg-white p-5 rounded-lg shadow-lg"
              style={{
                width: '600px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'auto'
              }}
            >
              <h2 className="text-lg text-black font-bold text-center">{state} Data</h2>

              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="mb-4"
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >

                <option value="ethnicityBarChart">Ethnicity Bar Chart</option>
                <option value="ecologicalInferencePlot">Ecological Inference Plot</option>
                <option value="ethnicityBarChartPop">Ethnicity Bar Chart Pop</option>
                <option value="precinctAnalysisChart">Precinct Analysis Chart</option>
                <option value="minorityRepresentationAllDistricts">Minority Representation Across All Districts</option>
                <option value="minorityRepresentation9Districts">Minority Representation Across 9 Congressional Districts</option>
                
                
              </select>


              <div className="flex-grow">
                {renderChart()}
              </div>

              <div className="flex justify-center" >
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default MapPage;
