import React, { useState, useRef, useMemo, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
// import { useParams } from 'react-router-dom';
import Arizona_Illinois from '../assets/Arizona_Illinois_Boundaries.json'
import ApprovedLegislativeDistricts from '../assets/Approved_Official_Legislative_Map.json';
import ArizonaBoundary from '../assets/arizona.json'
import ChartModal from '../components/modal';
import MapControl from '../components/MapControl';
import HeatMapSelection from '../components/HeatMapSelection';
import HeatMapLegend from '../components/HeatMapLegend';
import { useAppState } from '../AppStateContext';

const ZOOMSTATE = {
  Arizona: [-113.8, 34.25, 5.75],
  Illinois: [-91.8, 39.75, 5.75],
  USA: [-98.5795, 39.8283, 3.5]
};

const legendItems = [
  { color: '#ffffad', number: 10, value: '10%', textColor: '#000' },
  { color: '#f1e491', number: 20, value: '20%', textColor: '#000' },
  { color: '#e3ca77', number: 30, value: '30%', textColor: '#000' },
  { color: '#d5b05f', number: 40, value: '40%', textColor: '#000' },
  { color: '#c79649', number: 50, value: '50%', textColor: '#000' },
  { color: '#b97c35', number: 60, value: '60%', textColor: '#fff' },
  { color: '#aa6224', number: 70, value: '70%', textColor: '#fff' },
  { color: '#9a4716', number: 80, value: '80%', textColor: '#fff' },
  { color: '#8a2b0a', number: 90, value: '90%', textColor: '#fff' },
  { color: '#790000', number: 100, value: '100%', textColor: '#fff' },
];

const symbolStyle = {
  id: "my-layer-labels",
  type: "symbol",
  layout: {
    'text-field': ['get', 'LONGNAME'],
    'text-font': ['Open Sans Regular'],
    'text-size': 10
  },
  paint: {
    'text-color': '#000'
  }
};

const outLineStyle = {
  id: 'outline_style',
  type: 'line'
}

const CONVERT_RACE = {
  HispanicOrLatino: "OMB_LATINO",
  White: "OMB_NH_WHT",
  Black: "OMB_BLK_P",
  AsianOrPacificIslander: "OMB_ASNPI_",
  NativeAmerican: "OMB_NATIVE"
}

const MapPage = () => {
  const { appState } = useAppState();
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedHeatMap, setHeatMap] = useState("None");
  const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
  // const state = appState;
  const defaultState = appState && ZOOMSTATE[appState] ? appState : "USA";
  const [viewport, setViewport] = useState({
    longitude: ZOOMSTATE[defaultState][0],
    latitude: ZOOMSTATE[defaultState][1],
    zoom: ZOOMSTATE[defaultState][2],
  });
  console.log(viewport.zoom, appState);
  const [geojsonData, setGeojsonData] = useState(defaultState !== "USA" ? ApprovedLegislativeDistricts : ArizonaBoundary);
  useEffect(() => {
    //console.log("Viewport is", viewport.zoom, selectedHeatMap);
    if (viewport.zoom < 5 && selectedHeatMap === "None") {
      setGeojsonData(ArizonaBoundary);
    } else {
      setGeojsonData(ApprovedLegislativeDistricts);
    }
  }, [viewport.zoom, selectedHeatMap]);

  const layerStyle = useMemo(() => {
    if (selectedHeatMap === "PoliticalPartyPreference") {
      return {
        id: 'map_layers',
        type: 'fill',
        paint: {
          "fill-color": [
            "case",
            [">=", ["get", "CompRepVot"], 50], "#FF0000",
            [">=", ["get", "CompDemVot"], 50], "#0000FF", 
            "#AAAAAA" 
          ],
          "fill-opacity": 1
        }
      };
    } else {
      return {
        id: 'map_layers',
        type: 'fill',
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", CONVERT_RACE[selectedHeatMap] || 'COLOR'], 
              0, "#ffffad",
              10, "#ffffad",
              20, "#f1e491",
              30, "#e3ca77",
              40, "#d5b05f",
              50, "#c79649",
              60, "#b97c35",
              70, "#aa6224",
              80, "#9a4716",
              90, "#8a2b0a",
              100, "#790000",
          ],
          "fill-opacity": 1
        }
      };
    }
  }, [selectedHeatMap]); // Dependency on selectedHeatMap to trigger recalculation when it changes
  
  

  useEffect(() => {
    console.log("Heat map is", selectedHeatMap);
  }, [selectedHeatMap])
  const onStyleLoad = () => {
    console.log("Loaded");
    const map = mapRef.current.getMap();
    map.setLayoutProperty('state-label', 'text-field', [
      'format',
      ['get', 'name'],
      {
        'font-scale': 1.25,
        'text-font': [
          'literal',
          ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
        ]
      }
    ]);

    map.setPaintProperty('state-label', 'text-color', '#000000');
    //map.setPaintProperty('state-label', 'text-halo-width', 2);
  };

  // useEffect(() => {
  //   if (state && ZOOMSTATE[state]) {
  //     setViewport({
  //       longitude: ZOOMSTATE[state][0],
  //       latitude: ZOOMSTATE[state][1],
  //       zoom: ZOOMSTATE[state][2]
  //     });
  //   }
  // }, [state]);

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
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [ZOOMSTATE[appState][0], ZOOMSTATE[appState][1]], zoom: ZOOMSTATE[appState][2] })
    }
  }

  const handleClick = (event) => {
    const { features } = event;

    const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
    if (clickedFeature) {
      //console.log("hello")
      setShowModal(true);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {(selectedHeatMap !== "None" && selectedHeatMap !== "PoliticalPartyPreference") && <HeatMapLegend legendItems={legendItems} />}
      <HeatMapSelection selectedHeatMap={selectedHeatMap} setHeatMap={setHeatMap} />
      <MapControl zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} />
      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onClick={handleClick}
        interactiveLayerIds={['map_layers']}
        onLoad={onStyleLoad}
        attributionControl={false}
      >

        {showModal && <ChartModal state={appState} setShowModal={setShowModal} />}
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer {...layerStyle} />
          <Layer {...outLineStyle} />
          <Layer {...symbolStyle} />
        </Source>
      </Map>
    </div>
  );
};

export default MapPage;
