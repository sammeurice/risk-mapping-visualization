"use client";
import React from "react";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { Asset, ParsedAsset } from "./services/models";

export default function Home() {
  const [data, setData] = React.useState<ParsedAsset[]>([]);
  const [selectedDecade, setSelectedDecade] = React.useState("");
  const [selectedDecadeData, setSelectedDecadeData] = React.useState<
    ParsedAsset[]
  >([]);

  React.useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const parsedData = data.map((item: Asset) => {
          const parsedRiskFactors = JSON.parse(item["Risk Factors"]);
          return { ...item, "Risk Factors": parsedRiskFactors };
        });
        setData(parsedData);
      });
  }, []);

  function filterByDecade(assets: ParsedAsset[], year: string) {
    console.log(data);
    setSelectedDecade(year);
    return assets.filter((asset) => asset.Year === parseInt(year));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Hello</p>
      <select
        className="color-black"
        value={selectedDecade}
        onChange={(event) => {
          setSelectedDecadeData(filterByDecade(data, event.target.value));
        }}
      >
        <option value="2030">2030s</option>
        <option value="2040">2040s</option>
        <option value="2050">2050s</option>
        <option value="2060">2060s</option>
        <option value="2070">2070s</option>
      </select>
      <Table assets={selectedDecadeData} />
    </div>
  );
}
