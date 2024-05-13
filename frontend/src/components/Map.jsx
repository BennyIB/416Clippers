import React, { useState, useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import axios from 'axios';
import { useAppState } from '../AppStateContext';
import Arizona_3781 from '../assets/Arizona_district_boundaries_3781.json';
import Arizona_792 from '../assets/Arizona_district_boundaries_792.json';
import Illinois_3790 from '../assets/Illinois_district_boundaries_3790.json';
import Illinois_2139 from '../assets/Illinois_district_boundaries_2139.json';
const MAPPING = {
  "Arizona": 
  {
    "max": Arizona_3781,
    "avg": Arizona_792
  },
  "Illinois":
  { 
    "max": Illinois_3790,
    "avg": Illinois_2139
  }
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
  const { appState, selectedDistrict, setSelectedDistrict} = useAppState();
  const mapRef = useRef(null);
  const accessToken = import.meta.env.VITE_MAPACCESS_TOKEN;
  const [viewport, setViewport] = useState({
    longitude: props.ZOOMSTATE[props.defaultState][0],
    latitude: props.ZOOMSTATE[props.defaultState][1],
    zoom: props.ZOOMSTATE[props.defaultState][2],
  });
  const [mapData, setMapData] = useState(
    appState !== "USA"
      ? props.plan !== "none"
        ? props.geojsonData
        : MAPPING[appState][props.plan]
      : props.geojsonData
  )
  const getBoundaryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Arizona_Illinois_Boundaries');
      props.setBoundaryData(response.data);
      
    } catch (error) {
      console.error("There was an error fetching the geojson data:", error);
    }
  };
  const getLegislativeDistrictData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Arizona_Illinois_Legislative_Districts');
      props.setLegislativeDistrictData(response.data);
    } catch (error) {
      console.error("There was an error fetching the geojson data:", error);
    }
  };

  useEffect(() => {
    if(props.plan === "none")
    {
      setMapData(props.geojsonData);
    }
    else
    {
      setMapData(MAPPING[appState][props.plan]);
    }
  }, [props.plan, props.geojsonData]);
  useEffect(() => {
    getBoundaryData();
    getLegislativeDistrictData();
  }, []);
  // use effect for showing different map layers
  useEffect(() => {
    if (viewport.zoom < 5 && props.selectedHeatMap === "None") {
      props.setGeojsonData(props.boundaryData);
    } else {
      props.setGeojsonData(props.legislativeDistrictData);
    }
  }, [viewport.zoom, props.selectedHeatMap, props.boundaryData, props.legislativeDistrictData]);
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
            // 0, "#fff7fb",
            // 10, "#ece7f2",
            20, "#f1eef6",
            // 30, "#a6bddb",
            40, "#bdc9e1",
            // 50, "#3690c0",
            60, "#74a9cf",
            // 70, "#045a8d",
            80, "#2b8cbe",
            100, "#045a8d"
          ],
          "fill-opacity": 0.75
        }
      };
    }
  }, [props.selectedHeatMap]);

  const districtLayerStyle = useMemo(() => {
    return {
      id: 'districts',
      type: 'line',
      paint: {
        'line-width': [
          'case',
          ['==', ['get', 'DISTRICT'], selectedDistrict || 0], 5,
          1
        ],
        'line-color': [
          'case',
          ['==', ['get', 'DISTRICT'], selectedDistrict || 0], '#FF0000', 
          '#000000' 
        ]
      }
    };
  }, [selectedDistrict]);
  
  useEffect(() => {
    console.log("Current heatmap: ", props.selectedHeatMap);
  }, [props.selectedHeatMap])

  // modify state names to be more legible and readable
  const onStyleLoad = () => {
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
  useEffect(() => {
    //console.log("Compare View is", props.compareView);
    if(props.compareView && props.left)
    {
      setViewport({
        longitude: props.ZOOMSTATE[`${state}Left`][0],
        latitude: props.ZOOMSTATE[`${state}Left`][1],
        zoom: props.ZOOMSTATE[`${state}Left`][2]
      });
    }
  }, [props.compareView])

  // useEffect(() => {
  //   if (state && props.ZOOMSTATE[state]) {
  //     setViewport({
  //       longitude: props.ZOOMSTATE[state][0],
  //       latitude: props.ZOOMSTATE[state][1],
  //       zoom: props.ZOOMSTATE[state][2]
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
        // if(props.compareView && appState !== "USA")
        // {
        //   let newState = `${state}Left`;
        //   mapRef.current.flyTo({ center: [props.ZOOMSTATE[newState][0], props.ZOOMSTATE[newState][1]], zoom: props.ZOOMSTATE[newState][2] })
        // }
        // else
        // {
          mapRef.current.flyTo({ center: [props.ZOOMSTATE[props.state][0], props.ZOOMSTATE[props.state][1]], zoom: props.ZOOMSTATE[props.state][2]})
        //}
    }
  }
  const handleClick = (event) => {
    const { features } = event;
    const clickedFeature = features && features.find(f => f.layer.id === 'map_layers');
    if (clickedFeature) {
      //console.log(clickedFeature.properties.DISTRICT);
      if (selectedDistrict === clickedFeature.properties.DISTRICT) {
        setSelectedDistrict(null); 
      } else {
        setSelectedDistrict(clickedFeature.properties.DISTRICT);
      }
    }
  };

  return (
    <div className="relative w-full h-screen">

      <div className="flex w-full h-full">
        <div className="flex-grow border-r border-gray-500">
          <Map
            ref={mapRef}
            mapboxAccessToken={accessToken}
            {...viewport}
            onMove={evt => setViewport(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            onClick={handleClick}
            interactiveLayerIds={['map_layers']}
            onLoad={onStyleLoad}
            attributionControl={false}
          >
            <Source id="my-data" type="geojson" data={mapData}>
              <Layer {...layerStyle} />
              <Layer {...outLineStyle} />
              <Layer {...symbolStyle} />
              <Layer {...districtLayerStyle} />
            </Source>
          </Map>
        </div>
      </div>
    </div>
  );
});

export default MyMap;
