"use client";
import { Inter } from "next/font/google";
import React from "react";
import Map from "./components/Map";

const inter = Inter({ subsets: ["latin"] });

interface Asset {
  "Asset Name": string;
  "Business Category": string;
  Lat: number;
  Long: number;
  "Risk Factors": string;
  "Risk Rating": number;
  Year: number;
}

export default function Home() {
  const [data, setData] = React.useState<Asset[]>([]);
  const [selectedDecade, setSelectedDecade] = React.useState("");

  React.useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData));
  }, []);

  function filterByDecade(assets: Asset[]) {
    return assets.filter((asset) => asset.Year === parseInt(selectedDecade));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Hello</p>
      <select
        id="decade-select"
        value={selectedDecade}
        onChange={(event) => setSelectedDecade(event.target.value)}
      >
        <option value="2030">2030s</option>
        <option value="2040">2040s</option>
        <option value="2050">2050s</option>
        <option value="2060">2060s</option>
        <option value="2070">2070s</option>
      </select>
      <button onClick={() => console.log(filterByDecade(data))}>
        Press Me
      </button>
      <Map />
    </div>
  );
}
