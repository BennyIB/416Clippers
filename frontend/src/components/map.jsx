import React, { useState, useRef, useMemo, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
// import { useParams } from 'react-router-dom';
import Arizona_Illinois_Legislative_Districts from '../assets/Arizona_Illinois_Legislative_Districts.json'
import Arizona_Illinois_Boundary from '../assets/Arizona_Illinois_Boundary.json'
import ChartModal from './modal';
import MapControl from './MapControl';
import HeatMapSelection from './HeatMapSelection';
import HeatMapLegend from './HeatMapLegend';
import { useAppState } from '../AppStateContext';

const ZOOMSTATE = {
  Arizona: [-113.8, 34.25, 5.75],
  Illinois: [-91.8, 39.75, 5.75],
  USA: [-98.5795, 38, 4],
  ArizonaRight: [-111.8, 34.25, 5.75],
  IllinoisRight: [-89.8, 39.75, 5.75],
  ArizonaLeft: [-109.8, 34.25, 5.75],
  IllinoisLeft: [-87.8, 39.75, 5.75]
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

const MyMap = (props) => {
  const { appState } = useAppState();
  const mapRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
  let state; 

  if (props.compared) {
    switch (appState) {
      case "Arizona":
        state = "Illinois";
        break;
      case "Illinois":
        state = "Arizona";
        break;
      default:
        state = appState;
        break;
    }
  } else {
    state = appState;
  }
  console.log("Compared ",props.compared, state);
  let modifiedState = props.compared ? (state === appState ? `${state}Left` : `${state}Right`) : state;
  const defaultState = state && ZOOMSTATE[modifiedState] ? modifiedState : "USA";
  const [viewport, setViewport] = useState({
    longitude: ZOOMSTATE[defaultState][0],
    latitude: ZOOMSTATE[defaultState][1],
    zoom: ZOOMSTATE[defaultState][2],
  });
  //console.log(viewport.zoom, appState);
  const [geojsonData, setGeojsonData] = useState(defaultState !== "USA" ? Arizona_Illinois_Legislative_Districts : Arizona_Illinois_Boundary);
  useEffect(() => {
    //console.log("Viewport is", viewport.zoom, props.selectedHeatMap);
    if (viewport.zoom < 5 && props.selectedHeatMap === "None") {
      setGeojsonData(Arizona_Illinois_Boundary);
    } else {
      setGeojsonData(Arizona_Illinois_Legislative_Districts);
    }
  }, [viewport.zoom, props.selectedHeatMap]);

  const layerStyle = useMemo(() => {
    if (props.selectedHeatMap === "PoliticalPartyPreference") {
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
          "fill-opacity": 0.5
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
            ["get", CONVERT_RACE[props.selectedHeatMap] || 'COLOR'],
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
  }, [props.selectedHeatMap]);



  useEffect(() => {
    console.log("Heat map is", props.selectedHeatMap);
  }, [props.selectedHeatMap])
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

  useEffect(() => {
    console.log("Compare view is now", props.compareView);
    if(props.compareView && props.left)
    {
      setViewport({
        longitude: ZOOMSTATE[`${state}Left`][0],
        latitude: ZOOMSTATE[`${state}Left`][1],
        zoom: ZOOMSTATE[`${state}Left`][2]
      });
    }

  }, [props.compareView])

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
        if(props.compareView && appState !== "USA")
        {
          let newState = `${state}Left`;
          mapRef.current.flyTo({ center: [ZOOMSTATE[newState][0], ZOOMSTATE[newState][1]], zoom: ZOOMSTATE[newState][2] })
        }
        else
        {
          mapRef.current.flyTo({ center: [ZOOMSTATE[state][0], ZOOMSTATE[state][1]], zoom: ZOOMSTATE[state][2]})
        }
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
      {props.left &&
        <>
          {(props.selectedHeatMap !== "None" && props.selectedHeatMap !== "PoliticalPartyPreference") && <HeatMapLegend legendItems={legendItems} />}
          <HeatMapSelection selectedHeatMap={props.selectedHeatMap} setHeatMap={props.setHeatMap} />
          <MapControl zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} setCompareView={props.setCompareView} compareView={props.compareView} />
        </>
      }
      <div className="flex w-full h-full">
        <div className="flex-grow border-r border-gray-500">
          <Map
            ref={mapRef}
            mapboxAccessToken={accessToken}
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/light-v11"
            onClick={handleClick}
            interactiveLayerIds={['map_layers']}
            onLoad={onStyleLoad}
            attributionControl={false}
          >
            {showModal && <ChartModal state={state} setShowModal={setShowModal} />}
            <Source id="my-data" type="geojson" data={geojsonData}>
              <Layer {...layerStyle} />
              <Layer {...outLineStyle} />
              <Layer {...symbolStyle} />
            </Source>
          </Map>
        </div>
      </div>
    </div>
  );
};

export default MyMap;
