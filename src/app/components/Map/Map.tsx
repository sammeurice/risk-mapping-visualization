"use client";
import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Asset } from "@/app/services/models";

const Map = ({ assets }: { assets: Asset[] }) => {
  console.log(assets);
  const mapContainer = React.useRef<any>(null);
  const map = React.useRef<mapboxgl.Map | any>(null);

  React.useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-70, 40],
      zoom: 1.8,
    });

    const geojson = {
      type: "FeatureCollection",
      features: assets.map((asset) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [asset.Long, asset.Lat],
        },
        properties: {
          name: asset["Asset Name"],
          category: asset["Business Category"],
          riskRating: asset["Risk Rating"],
          year: asset.Year,
        },
      })),
    };

    map.current.on("load", () => {
      addAssets();
    });

    const addAssets = () => {
      geojson.features.forEach((feature) => {
        console.log(feature);
        const el = document.createElement("div");
        el.className = "marker";
        new mapboxgl.Marker(el)
          .setLngLat([
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ])
          .addTo(map.current);
      });
    };
  }, [assets]);

  return (
    <main>
      <div
        className="map-container"
        style={{ height: 500, width: 700 }}
        ref={mapContainer}
      />
    </main>
  );
};

export default Map;

// `<h1>Business Name: ${asset.properties.name}</h1>
//               <h1>Business Category: ${asset.properties.category}</h1>
//               <h1>Risk Rating: ${asset.properties.riskRating}</h1>
//               <h1>Year: ${asset.properties.year}</h1>`
