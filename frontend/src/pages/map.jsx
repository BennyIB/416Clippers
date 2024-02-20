import React, { useState, useRef } from 'react';
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
  const map = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');

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

  function zoomTo() {
    if(map.current)
    {
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
    if (clickedFeature) {
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
      default:
        return <EthnicityBarChart />;
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
                      <h2 className="text-lg text-black font-bold text-center">Arizona Data</h2>
                    
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
      <Layer {...layerStyle}/>
      </Source>
      </Map>
    </div>
  );
};

export default MapPage;
