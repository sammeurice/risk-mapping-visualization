import React from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainer = React.useRef<any>(null);
  const map = React.useRef<mapboxgl.Map | any>(null);

  const markers = [
    {
      city: "Sydney",
      country: "Australia",
      latCoord: -33.8688,
      longCoord: 151.2093,
    },
    {
      city: "Amsterdam",
      country: "Netherlands",
      latCoord: 52.3676,
      longCoord: 4.9041,
    },
    {
      city: "Seoul",
      country: "South Korea",
      latCoord: 37.5665,
      longCoord: 126.978,
    },
  ];

  React.useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [15.4542, 18.7322],
      zoom: 1.8,
    });

    const geojson = {
      type: "FeatureCollection",
      features: markers.map((marker) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [marker.longCoord, marker.latCoord],
        },
        properties: {
          city: marker.city,
          country: marker.country,
        },
      })),
    };

    map.current.on("load", () => {
      addMarkers();
    });

    const addMarkers = () => {
      geojson.features.forEach((marker) => {
        const markerIcon = document.createElement("div");
        markerIcon.className = "location-marker";
        markerIcon.style.backgroundColor = "blue";
        markerIcon.style.backgroundImage = "url(/Locationpin.png)";
        markerIcon.style.width = "50px";
        markerIcon.style.height = "50px";

        new mapboxgl.Marker()
          .setLngLat([
            marker.geometry.coordinates[0],
            marker.geometry.coordinates[1],
          ])
          .setPopup(
            // add pop out to map
            new mapboxgl.Popup({ className: "my-popup" }).setHTML(
              `<h1>${marker.properties.city}, ${marker.properties.country}</h1>`
            )
          )
          .addTo(map.current);
      });
    };
  }, []);

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
