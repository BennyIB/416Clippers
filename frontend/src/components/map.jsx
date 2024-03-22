import React, { useState, useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import ChartModal from './Modal';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useAppState } from '../AppStateContext';

// Default zoom and coordinates
const ZOOMSTATE = {
  Arizona: [-115.5, 34.25, 5.75],
  Illinois: [-93.8, 39.75, 5.75],
  USA: [-98.5795, 38, 4],
  ArizonaRight: [-111.8, 34.75, 5.5],
  IllinoisRight: [-89.8, 40.25, 5.5],
  ArizonaLeft: [-112.5, 34.75, 5.5],
  IllinoisLeft: [-90.25, 40.25, 5.75]
};

// style for labeling districts in states
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

// style for outlining the states
const outLineStyle = {
  id: 'outline_style',
  type: 'line'
}

// key-value pair to convert a selection to the data retrieval key
const CONVERT_RACE = {
  HispanicOrLatino: "OMB_LATINO",
  White: "OMB_NH_WHT",
  Black: "OMB_BLK_P",
  AsianOrPacificIslander: "OMB_ASNPI_",
  NativeAmerican: "OMB_NATIVE"
}


const MyMap = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
      zoomIn,
      zoomOut,
      resetZoom
    }));

  const { appState } = useAppState();
  const mapRef = useRef(null);
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

  // set view based on default
  const [viewport, setViewport] = useState({
    longitude: ZOOMSTATE[defaultState][0],
    latitude: ZOOMSTATE[defaultState][1],
    zoom: ZOOMSTATE[defaultState][2],
  });

  const [boundaryData, setBoundaryData] = useState('');
  const [legislativeDistrictData, setLegislativeDistrictData] = useState('');
  // let boundaryData = " "
  // let legislativeDistrictData = ""
  const [geojsonData, setGeojsonData] = useState(defaultState !== "USA" ? legislativeDistrictData : boundaryData);
  //console.log(viewport.zoom, appState);
  
  //Making a GET request to get the boundary data
  const fetchBoundaryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Arizona_Illinois_Boundaries');
      setBoundaryData(response.data);
      
    } catch (error) {
      console.error("There was an error fetching the geojson data:", error);
    }
  };

  //Making a GET request to get the Legislative District Data
  const fetchLegislativeDistrictData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Arizona_Illinois_Legislative_Districts');
      setLegislativeDistrictData(response.data);
    } catch (error) {
      console.error("There was an error fetching the geojson data:", error);
    }
  };

  useEffect(() => {
    fetchBoundaryData();
    fetchLegislativeDistrictData();
  },[]);

  useEffect(() => {
    //console.log("Viewport is", viewport.zoom, props.selectedHeatMap);
    if (viewport.zoom < 5 && props.selectedHeatMap === "None") {
      setGeojsonData(boundaryData);
    } else {
      setGeojsonData(legislativeDistrictData);
    }
  }, [viewport.zoom, props.selectedHeatMap]);

  // control for heatmap
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
            0, "#ffffff",
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


  // debug statement
  useEffect(() => {
    console.log("Heat map is", props.selectedHeatMap);
  }, [props.selectedHeatMap])

  // modify state names to be more legible and readable
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
  };

  // modify view if compare mode is active
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

  // handle for zoom in
  const zoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: prevViewport.zoom + 1
    }));
  };

  // handle for zoom out
  const zoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: prevViewport.zoom - 1
    }));
  };

  // resets zoom based on current state
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

  // handle for on click events
  const handleClick = (event) => {
    const { features } = event;

    const clickedFeature = features && features.find(f => f.layer.id === layerStyle.id);
    if (clickedFeature && appState === state) {
      setShowSidebar(true);
    }
  };

  const handleCloseSideBar = () => {
    setShowSidebar(false)
  }

  return (
    <div className="relative w-full h-screen">

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
});

export default MyMap;
