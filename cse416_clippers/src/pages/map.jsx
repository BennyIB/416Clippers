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
    

const MapPage = () => {
    const map = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
    const { state } = useParams();
    let lat = 39.8283;
    let long = -98.5795;
    let zoom = 3;
    if(state === 'Arizona')
    {
      lat = 34.048927;
      long = -111.093735;
      zoom = 5.75;
    }
    else if(state === 'Illinois')
    {
      lat = 39.75
      long = -89
      zoom = 5.75;
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
    const handleClick = (event) => {
      const { features } = event;
      setShowModal(true);
      const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
      console.log(event)
      if (clickedFeature) {
        console.log("Feature clicked:", clickedFeature);
      }
    };
    return (
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
        {showModal && (
                <div className="fixed inset-0 bg-white-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div 
                        className="bg-white p-5 rounded-lg shadow-lg" 
                        style={{
                            width: '500px', // Fixed width
                            height: '300px', // Fixed height
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between', // This ensures that the button aligns to the bottom
                            overflow: 'auto' // Handles overflow content
                        }}
                    >
                        <h2 className="text-lg text-black font-bold text-center">Arizona Data</h2>
                        <p className="mb-4 text-black">MODALL</p>
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
    );
};

export default MapPage;
